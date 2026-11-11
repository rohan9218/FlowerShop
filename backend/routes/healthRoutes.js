
const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Bloom & Blossom API is running.",
        environment: process.env.NODE_ENV || "development",
    });
});

module.exports = router;
