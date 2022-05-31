const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  allOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../controller/orderController.js");
const router = express.Router();

const {
  isAuthenticatedUser,
  authorizedRoles,
} = require("../middleware/auth.js");

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

router.route("/my/order").get(isAuthenticatedUser, myOrders);

router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizedRoles("admin"), allOrders);

router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateOrderStatus)
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteOrder);

module.exports = router;
