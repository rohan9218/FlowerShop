
const express = require("express");

const {
    adminLogin,
    verifyAdmin,
    loginLimiter,
} = require("../controllers/adminController");

const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

// Admin login
router.post("/login", loginLimiter, adminLogin);

// Verify admin session
router.get("/verify", adminAuth, verifyAdmin);

module.exports = router;
