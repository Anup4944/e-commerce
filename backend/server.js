const app = require("./app.js");

const dotenv = require("dotenv");

const connectDb = require("./config/database.js");

dotenv.config({ path: "backend/config/config.env" });

connectDb();

// handling uncaught exception

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down server due to uncaught exception`);
  process.exit(1);
});

const server = app.listen(process.env.PORT, (req, res) => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});

// unhandle promise rejection

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down server due to unhandled promise rejection`);

  server.close(() => {
    process.exit();
  });
});
