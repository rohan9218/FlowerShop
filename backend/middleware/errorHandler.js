
const errorHandler = (error, req, res, next) => {
    console.error("Backend Error:", error.message);

    if (res.headersSent) {
        return next(error);
    }

    return res.status(error.statusCode || 500).json({
        success: false,
        message:
            process.env.NODE_ENV === "production"
                ? "Internal server error."
                : error.message || "Something went wrong.",
    });
};

module.exports = errorHandler;
