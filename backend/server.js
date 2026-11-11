require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const pool = require("./config/database");
const branchRoutes = require("./routes/branchRoutes");
const adminRoutes = require("./routes/adminRoutes");
const healthRoutes = require("./routes/healthRoutes");
const staffRoutes = require("./routes/staffRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
app.set("trust proxy", 1);
const PORT = process.env.PORT || 5000;

const requiredEnvVariables = [
    "ADMIN_EMAIL",
    "ADMIN_PASSWORD_HASH",
    "JWT_SECRET",
    "DB_NAME",
    "DB_USER",
];

const missingVariables = requiredEnvVariables.filter(
    (variable) => !process.env[variable]
);

if (missingVariables.length > 0) {
    console.error(
        `Missing environment variables: ${missingVariables.join(", ")}`
    );
    process.exit(1);
}

if (process.env.JWT_SECRET.length < 32) {
    console.error("JWT_SECRET must contain at least 32 characters.");
    process.exit(1);
}

const allowedOrigins = (
    process.env.CLIENT_URL || "http://localhost:5173"
)
    .split(",")
    .map((origin) => origin.trim().replace(/\/+$/, ""))
    .filter(Boolean);

app.use(helmet());

app.use(
    cors({
        origin(origin, callback) {
            const normalizedOrigin = origin ? origin.replace(/\/+$/, "") : "";
            if (
                !origin ||
                allowedOrigins.includes("*") ||
                allowedOrigins.includes(normalizedOrigin) ||
                process.env.NODE_ENV !== "production"
            ) {
                return callback(null, true);
            }

            return callback(new Error("Origin not allowed by CORS."));
        },
        credentials: true,
    })
);

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: false, limit: "10kb" }));

// API routes
app.use("/api/health", healthRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/branches", branchRoutes);
// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API route not found.",
    });
});

// Central error handler
app.use(errorHandler);

// Start server after checking MySQL connection
const startServer = async () => {
    try {
        const connection = await pool.getConnection();

        console.log("MySQL Database Connected Successfully!");

        connection.release();

        app.listen(PORT, "0.0.0.0", () => {
            console.log("-------------------------------------");
            console.log("Bloom & Blossom Backend Started");
            console.log(`Server: http://localhost:${PORT}`);
            console.log(`Database: ${process.env.DB_NAME}`);
            console.log(`Environment: ${process.env.NODE_ENV}`);
            console.log("-------------------------------------");
        });
    } catch (error) {
        console.error("MySQL Connection Failed:", error.message);
        process.exit(1);
    }
};

startServer();

// Graceful shutdown
const shutdown = async () => {
    console.log("Closing Bloom & Blossom backend...");

    await pool.end();
    process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);