const express = require("express");

const errorMiddleware = require("./middleware/error.js");

const app = express();

app.use(express.json());

const product = require("./routes/productRoute.js");

app.use("/api/v1", product);

// error middleware
app.use(errorMiddleware);

module.exports = app;
