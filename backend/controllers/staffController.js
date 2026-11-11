const pool = require("../config/database");

const MOBILE_REGEX = /^[6-9]\d{9}$/;
const ALLOWED_ROLES = ["Staff", "Sub-admin"];

// GET: Fetch all staff members
const getStaff = async (req, res, next) => {
    try {
        const [rows] = await pool.execute(
            `SELECT
                id,
                name,
                mobile,
                role,
                created_at AS createdAt
             FROM staff_members
             ORDER BY created_at DESC, id DESC`
        );

        return res.status(200).json({
            success: true,
            count: rows.length,
            staff: rows,
        });
    } catch (error) {
        next(error);
    }
};

// POST: Add a new staff member
const createStaff = async (req, res, next) => {
    try {
        const name =
            typeof req.body.name === "string"
                ? req.body.name.trim()
                : "";

        const mobile =
            typeof req.body.mobile === "string"
                ? req.body.mobile.trim()
                : "";

        const role =
            typeof req.body.role === "string"
                ? req.body.role.trim()
                : "Staff";

        // Validate name
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Please enter the staff member's name.",
            });
        }

        if (name.length > 80) {
            return res.status(400).json({
                success: false,
                message: "Name cannot be longer than 80 characters.",
            });
        }

        // Validate mobile number
        if (!MOBILE_REGEX.test(mobile)) {
            return res.status(400).json({
                success: false,
                message: "Enter a valid 10-digit Indian mobile number.",
            });
        }

        // Validate role
        if (!ALLOWED_ROLES.includes(role)) {
            return res.status(400).json({
                success: false,
                message: "Please select a valid staff role.",
            });
        }

        // Insert staff into MySQL
        const [result] = await pool.execute(
            `INSERT INTO staff_members (name, mobile, role)
             VALUES (?, ?, ?)`,
            [name, mobile, role]
        );

        // Fetch the newly inserted record
        const [rows] = await pool.execute(
            `SELECT
                id,
                name,
                mobile,
                role,
                created_at AS createdAt
             FROM staff_members
             WHERE id = ?
             LIMIT 1`,
            [result.insertId]
        );

        return res.status(201).json({
            success: true,
            message: `${name} has been added successfully.`,
            staff: rows[0],
        });
    } catch (error) {
        // MySQL duplicate mobile number
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                success: false,
                message: "This mobile number is already registered.",
            });
        }

        next(error);
    }
};

// DELETE: Delete a staff member
const deleteStaff = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isSafeInteger(id) || id <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid staff member ID.",
            });
        }

        const [result] = await pool.execute(
            "DELETE FROM staff_members WHERE id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Staff member not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Staff member deleted successfully.",
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getStaff,
    createStaff,
    deleteStaff,
};