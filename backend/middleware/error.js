const ErrorHandler = require("../utils/errorHandler.js");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";

  // wrong mongodb ID error
  if (err.name === "CastError") {
    const message = `Resource not found, Invalid : ${err.path}`;

    err = new ErrorHandler(message, 400);
  }

  // mongoose dublicate error
  if (err.code === 11000) {
    const message = `Email already exists`;

    err = new ErrorHandler(message, 400);
  }

  // jwt error'

  if (err.code === `jsonwebtokenError`) {
    const message = `Token invalid`;

    err = new ErrorHandler(message, 400);
  }

  // jwt expired'

  if (err.code === `TokenExpireError`) {
    const message = `Token expired`;

    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    status: "error",
    message: err.message,
  });
};
