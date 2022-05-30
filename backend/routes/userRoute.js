const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
} = require("../controller/userController");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/forgot/password").post(forgotPassword);
router.route("/reset/password/:token").put(resetPassword);
router.route("/logout").get(logout);

module.exports = router;
