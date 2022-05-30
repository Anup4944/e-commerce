const express = require("express");
const cookieParser = require("cookie-parser");

const errorMiddleware = require("./middleware/error.js");

const app = express();

app.use(express.json());
app.use(cookieParser());

const product = require("./routes/productRoute.js");
const user = require("./routes/userRoute.js");

app.use("/api/v1", product);
app.use("/api/v1", user);

// error middleware
app.use(errorMiddleware);

module.exports = app;
