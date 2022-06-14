const express = require("express");
const {
  processPayment,
  sendStripeKey,
} = require("../controller/paymentController.js");
const router = express.Router();

const { isAuthenticatedUser } = require("../middleware/auth.js");

router.route("/payment/process").post(isAuthenticatedUser, processPayment);
router.route("/stripekey").get(isAuthenticatedUser, sendStripeKey);
module.exports = router;
