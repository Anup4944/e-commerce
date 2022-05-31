const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
} = require("../controller/orderController.js");
const router = express.Router();

const {
  isAuthenticatedUser,
  authorizedRoles,
} = require("../middleware/auth.js");

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router
  .route("/order/:id")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getSingleOrder);

router.route("/my/order").get(isAuthenticatedUser, myOrders);

module.exports = router;
