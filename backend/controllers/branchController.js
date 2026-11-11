
const pool = require("../config/database");

// ==========================================
// GET ALL BRANCHES, SUB-ADMINS AND STAFF
// ==========================================
const getBranches = async (req, res, next) => {
    try {
        // Fetch all branches with their assigned Sub-admin
        const [branches] = await pool.execute(`
            SELECT
                b.id,
                b.name,
                b.address,
                b.sub_admin_id AS subAdminId,
                s.name AS subAdminName,
                s.mobile AS subAdminMobile,
                b.created_at AS createdAt
            FROM branches b
            INNER JOIN staff_members s
                ON b.sub_admin_id = s.id
            ORDER BY b.created_at DESC, b.id DESC
        `);

        // Fetch all assigned staff for every branch
        const [assignedStaff] = await pool.execute(`
            SELECT
                bs.branch_id AS branchId,
                s.id,
                s.name,
                s.mobile
            FROM branch_staff bs
            INNER JOIN staff_members s
                ON bs.staff_id = s.id
            ORDER BY s.name ASC
        `);

        // Attach staff to their respective branches
        const staffByBranch = new Map();

        assignedStaff.forEach((person) => {
            const branchId = String(person.branchId);

            if (!staffByBranch.has(branchId)) {
                staffByBranch.set(branchId, []);
            }

            staffByBranch.get(branchId).push({
                id: person.id,
                name: person.name,
                mobile: person.mobile,
            });
        });

        const formattedBranches = branches.map((branch) => ({
            ...branch,
            staff: staffByBranch.get(String(branch.id)) || [],
        }));

        // Fetch all available Sub-admins
        const [subAdmins] = await pool.execute(`
            SELECT id, name, mobile
            FROM staff_members
            WHERE role = 'Sub-admin'
            ORDER BY name ASC
        `);

        // Fetch all available Staff members
        const [staffMembers] = await pool.execute(`
            SELECT id, name, mobile
            FROM staff_members
            WHERE role = 'Staff'
            ORDER BY name ASC
        `);

        return res.status(200).json({
            success: true,
            branches: formattedBranches,
            subAdmins,
            staffMembers,
            counts: {
                totalBranches: formattedBranches.length,
                availableSubAdmins: subAdmins.length,
                availableStaff: staffMembers.length,
            },
        });
    } catch (error) {
        return next(error);
    }
};

// ==========================================
// CREATE A NEW BRANCH
// ==========================================
const createBranch = async (req, res, next) => {
    let connection;

    try {
        const name =
            typeof req.body.name === "string"
                ? req.body.name.trim()
                : "";

        const address =
            typeof req.body.address === "string"
                ? req.body.address.trim()
                : "";

        const subAdminId = Number(req.body.subAdminId);
        const rawStaffIds = req.body.staffIds;

        if (!name || !address) {
            return res.status(400).json({
                success: false,
                message: "Please enter the branch name and address.",
            });
        }

        if (name.length > 100) {
            return res.status(400).json({
                success: false,
                message: "Branch name cannot exceed 100 characters.",
            });
        }

        if (address.length > 500) {
            return res.status(400).json({
                success: false,
                message: "Branch address cannot exceed 500 characters.",
            });
        }

        if (!Number.isSafeInteger(subAdminId) || subAdminId <= 0) {
            return res.status(400).json({
                success: false,
                message: "Please select a valid Sub-admin.",
            });
        }

        if (!Array.isArray(rawStaffIds) || rawStaffIds.length > 500) {
            return res.status(400).json({
                success: false,
                message: "Invalid staff selection.",
            });
        }

        const staffIds = rawStaffIds.map(Number);

        if (
            staffIds.some(
                (id) => !Number.isSafeInteger(id) || id <= 0
            )
        ) {
            return res.status(400).json({
                success: false,
                message: "One or more selected staff IDs are invalid.",
            });
        }

        const uniqueStaffIds = [...new Set(staffIds)];

        if (uniqueStaffIds.length !== staffIds.length) {
            return res.status(400).json({
                success: false,
                message: "Duplicate staff members are not allowed.",
            });
        }

        connection = await pool.getConnection();

        await connection.beginTransaction();

        // Verify selected Sub-admin
        const [subAdminRows] = await connection.execute(
            `SELECT id
             FROM staff_members
             WHERE id = ? AND role = 'Sub-admin'
             LIMIT 1`,
            [subAdminId]
        );

        if (subAdminRows.length === 0) {
            await connection.rollback();

            return res.status(400).json({
                success: false,
                message: "Selected Sub-admin is no longer available.",
            });
        }

        // Verify all selected Staff members
        if (uniqueStaffIds.length > 0) {
            const placeholders = uniqueStaffIds
                .map(() => "?")
                .join(",");

            const [staffRows] = await connection.execute(
                `SELECT id
                 FROM staff_members
                 WHERE role = 'Staff'
                 AND id IN (${placeholders})`,
                uniqueStaffIds
            );

            if (staffRows.length !== uniqueStaffIds.length) {
                await connection.rollback();

                return res.status(400).json({
                    success: false,
                    message: "One or more selected Staff members are no longer available.",
                });
            }
        }

        // Insert branch
        const [branchResult] = await connection.execute(
            `INSERT INTO branches
                (name, address, sub_admin_id)
             VALUES (?, ?, ?)`,
            [name, address, subAdminId]
        );

        const branchId = branchResult.insertId;

        // Assign selected Staff members
        if (uniqueStaffIds.length > 0) {
            const values = uniqueStaffIds
                .map(() => "(?, ?)")
                .join(", ");

            const parameters = uniqueStaffIds.flatMap((staffId) => [
                branchId,
                staffId,
            ]);

            await connection.execute(
                `INSERT INTO branch_staff
                    (branch_id, staff_id)
                 VALUES ${values}`,
                parameters
            );
        }

        await connection.commit();

        return res.status(201).json({
            success: true,
            message: `${name} branch has been created successfully.`,
            branchId,
        });
    } catch (error) {
        if (connection) {
            await connection.rollback();
        }

        return next(error);
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

// ==========================================
// UPDATE BRANCH DETAILS AND TEAM ASSIGNMENTS
// ==========================================
const updateBranch = async (req, res, next) => {
    let connection;
    let transactionStarted = false;

    try {
        const branchId = Number(req.params.id);

        const name =
            typeof req.body.name === "string"
                ? req.body.name.trim()
                : "";

        const address =
            typeof req.body.address === "string"
                ? req.body.address.trim()
                : "";

        const subAdminId = Number(req.body.subAdminId);
        const rawStaffIds = req.body.staffIds;

        // Validate branch ID
        if (!Number.isSafeInteger(branchId) || branchId <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid branch ID.",
            });
        }

        // Validate branch details
        if (!name || !address) {
            return res.status(400).json({
                success: false,
                message: "Branch name and address are required.",
            });
        }

        if (name.length > 100) {
            return res.status(400).json({
                success: false,
                message: "Branch name cannot exceed 100 characters.",
            });
        }

        if (address.length > 500) {
            return res.status(400).json({
                success: false,
                message: "Branch address cannot exceed 500 characters.",
            });
        }

        // Validate Sub-admin
        if (!Number.isSafeInteger(subAdminId) || subAdminId <= 0) {
            return res.status(400).json({
                success: false,
                message: "Please select a valid Sub-admin.",
            });
        }

        // Validate Staff selection
        if (!Array.isArray(rawStaffIds) || rawStaffIds.length > 500) {
            return res.status(400).json({
                success: false,
                message: "Invalid staff selection.",
            });
        }

        const staffIds = rawStaffIds.map(Number);

        if (
            staffIds.some(
                (id) => !Number.isSafeInteger(id) || id <= 0
            )
        ) {
            return res.status(400).json({
                success: false,
                message: "One or more selected staff IDs are invalid.",
            });
        }

        const uniqueStaffIds = [...new Set(staffIds)];

        if (uniqueStaffIds.length !== staffIds.length) {
            return res.status(400).json({
                success: false,
                message: "Duplicate staff members are not allowed.",
            });
        }

        connection = await pool.getConnection();

        await connection.beginTransaction();
        transactionStarted = true;

        // Check whether the branch exists
        const [branchRows] = await connection.execute(
            `SELECT id
             FROM branches
             WHERE id = ?
             FOR UPDATE`,
            [branchId]
        );

        if (branchRows.length === 0) {
            await connection.rollback();
            transactionStarted = false;

            return res.status(404).json({
                success: false,
                message: "Branch not found.",
            });
        }

        // Verify selected Sub-admin
        const [subAdminRows] = await connection.execute(
            `SELECT id
             FROM staff_members
             WHERE id = ?
             AND role = 'Sub-admin'
             LIMIT 1`,
            [subAdminId]
        );

        if (subAdminRows.length === 0) {
            await connection.rollback();
            transactionStarted = false;

            return res.status(400).json({
                success: false,
                message: "Selected Sub-admin is no longer available.",
            });
        }

        // Verify all selected Staff members
        if (uniqueStaffIds.length > 0) {
            const placeholders = uniqueStaffIds
                .map(() => "?")
                .join(",");

            const [staffRows] = await connection.execute(
                `SELECT id
                 FROM staff_members
                 WHERE role = 'Staff'
                 AND id IN (${placeholders})`,
                uniqueStaffIds
            );

            if (staffRows.length !== uniqueStaffIds.length) {
                await connection.rollback();
                transactionStarted = false;

                return res.status(400).json({
                    success: false,
                    message: "One or more selected Staff members are no longer available.",
                });
            }
        }

        // Update branch details
        await connection.execute(
            `UPDATE branches
             SET
                name = ?,
                address = ?,
                sub_admin_id = ?
             WHERE id = ?`,
            [name, address, subAdminId, branchId]
        );

        // Remove previous Staff assignments
        await connection.execute(
            `DELETE FROM branch_staff
             WHERE branch_id = ?`,
            [branchId]
        );

        // Insert updated Staff assignments
        if (uniqueStaffIds.length > 0) {
            const values = uniqueStaffIds
                .map(() => "(?, ?)")
                .join(", ");

            const parameters = uniqueStaffIds.flatMap((staffId) => [
                branchId,
                staffId,
            ]);

            await connection.execute(
                `INSERT INTO branch_staff
                    (branch_id, staff_id)
                 VALUES ${values}`,
                parameters
            );
        }

        await connection.commit();
        transactionStarted = false;

        return res.status(200).json({
            success: true,
            message: `${name} branch has been updated successfully.`,
            branchId,
        });
    } catch (error) {
        if (connection && transactionStarted) {
            try {
                await connection.rollback();
            } catch (rollbackError) {
                console.error(
                    "Branch update rollback failed:",
                    rollbackError.message
                );
            }
        }

        return next(error);
    } finally {
        if (connection) {
            connection.release();
        }
    }
};

// ==========================================
// DELETE A BRANCH
// ==========================================
const deleteBranch = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isSafeInteger(id) || id <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid branch ID.",
            });
        }

        const [result] = await pool.execute(
            "DELETE FROM branches WHERE id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Branch not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Branch deleted successfully.",
        });
    } catch (error) {
        return next(error);
    }
};

// ==========================================
// EXPORT CONTROLLERS
// ==========================================
module.exports = {
    getBranches,
    createBranch,
    updateBranch,
    deleteBranch,
};
