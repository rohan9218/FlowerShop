
const bcrypt = require("bcryptjs");
const rateLimit = require("express-rate-limit");

const generateToken = require("../utils/generateToken");

// Login rate limiter
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many login attempts. Try again after 15 minutes.",
    },
});

// Admin login controller
const adminLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (
            typeof email !== "string" ||
            typeof password !== "string" ||
            !email.trim() ||
            !password
        ) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required.",
            });
        }

        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

        if (!adminEmail || !adminPasswordHash) {
            return res.status(500).json({
                success: false,
                message: "Admin credentials are not configured.",
            });
        }

        const isEmailValid =
            email.trim().toLowerCase() ===
            adminEmail.trim().toLowerCase();

        const isPasswordValid = await bcrypt.compare(
            password,
            adminPasswordHash
        );

        if (!isEmailValid || !isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password.",
            });
        }

        const token = generateToken({
            email: adminEmail,
            role: "admin",
        });

        return res.status(200).json({
            success: true,
            message: "Admin login successful.",
            token,
            admin: {
                email: adminEmail,
                role: "admin",
            },
        });
    } catch (error) {
        next(error);
    }
};

// Verify admin session controller
const verifyAdmin = (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Admin session is valid.",
        admin: req.admin,
    });
};

module.exports = {
    adminLogin,
    verifyAdmin,
    loginLimiter,
};
