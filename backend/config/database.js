
const mysql = require("mysql2/promise");

const requiredEnvVariables = [
    "DB_HOST",
    "DB_PORT",
    "DB_USER",
    "DB_PASSWORD",
    "DB_NAME",
];

const missingVariables = requiredEnvVariables.filter(
    (variable) => !process.env[variable]
);

if (missingVariables.length > 0) {
    throw new Error(
        `Missing database environment variables: ${missingVariables.join(", ")}`
    );
}

const databasePort = Number(process.env.DB_PORT);

if (!Number.isInteger(databasePort) || databasePort <= 0) {
    throw new Error("Invalid DB_PORT environment variable.");
}

if (process.env.DB_SSL !== "true") {
    throw new Error("DB_SSL must be set to true for the TiDB Cloud connection.");
}

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: databasePort,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,

    charset: "utf8mb4",
    enableKeepAlive: true,

    // Secure TLS connection with certificate verification enabled.
    ssl: {
        minVersion: "TLSv1.2",
    },
});

module.exports = pool;
