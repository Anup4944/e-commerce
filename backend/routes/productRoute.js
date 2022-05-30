const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
} = require("../controller/productController.js");
const {
  isAuthenticatedUser,
  authorizedRoles,
} = require("../middleware/auth.js");

const router = express.Router();

router.route("/product").get(getAllProducts);
router
  .route("/product/new")
  .post(isAuthenticatedUser, authorizedRoles("admin"), createProduct);
router
  .route("/product/:id")
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteProduct)
  .get(getSingleProduct);

module.exports = router;
