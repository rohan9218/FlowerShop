
const jwt = require("jsonwebtoken");

const adminAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Please log in to access this resource.",
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (
            decoded.role !== "admin" ||
            !decoded.email ||
            decoded.email.toLowerCase() !==
                (process.env.ADMIN_EMAIL || "").trim().toLowerCase()
        ) {
            return res.status(403).json({
                success: false,
                message: "Admin access denied.",
            });
        }

        req.admin = {
            email: decoded.email,
            role: decoded.role,
        };

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message:
                error.name === "TokenExpiredError"
                    ? "Your session has expired. Please log in again."
                    : "Invalid authentication token.",
        });
    }
};

module.exports = adminAuth;
