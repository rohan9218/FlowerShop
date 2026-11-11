
const express = require("express");

const adminAuth = require("../middleware/adminAuth");

const {
    getBranches,
    createBranch,
    updateBranch,
    deleteBranch,
} = require("../controllers/branchController");

const router = express.Router();

// Protect all branch APIs
router.use(adminAuth);

// Get branches, Sub-admins and Staff
router.get("/", getBranches);

// Create branch and assign team
router.post("/", createBranch);

// Update branch details and team assignments
router.put("/:id", updateBranch);

// Delete branch
router.delete("/:id", deleteBranch);

module.exports = router;
