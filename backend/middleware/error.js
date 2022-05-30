const ErrorHandler = require("../utils/errorHandler.js");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";

  // wrong mongodb ID error
  if (err.name === "CastError") {
    const message = `Resource not found, Invalid : ${err.path}`;

    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    status: "error",
    message: err.message,
  });
};
