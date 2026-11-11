const express = require("express");

const adminAuth = require("../middleware/adminAuth");

const {
    getStaff,
    createStaff,
    deleteStaff,
} = require("../controllers/staffController");

const router = express.Router();

// Protect all staff routes with admin authentication
router.use(adminAuth);

// Fetch all staff
router.get("/", getStaff);

// Add staff
router.post("/", createStaff);

// Delete staff
router.delete("/:id", deleteStaff);

module.exports = router;