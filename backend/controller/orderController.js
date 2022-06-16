const Order = require("../models/Order.js");
const Product = require("../models/Product.js");
const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");

/// Create order

exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderedItems,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderedItems,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    status: "success",
    order,
  });
});

// GET SINGLE ORDER

exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("No order found", 404));
  }

  res.status(200).json({
    status: "success",
    order,
  });
});

// LOGGED IN USER ORDERS

exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.find({ user: req.user.id });

  if (!order) {
    return next(new ErrorHandler("No order found", 404));
  }

  res.status(200).json({
    status: "success",
    order,
  });
});

// GET ALL ORDERS --ADMIN

exports.allOrders = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.find();

  let totalAmount = 0;

  order.forEach((ord) => {
    totalAmount += ord.totalPrice;
  });

  if (!order) {
    return next(new ErrorHandler("No order found", 404));
  }

  res.status(200).json({
    status: "success",
    order,
    totalAmount,
  });
});

// UPDATE ORDER STATUS--ADMIN

exports.updateOrderStatus = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("No order found", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this order", 404));
  }
  if (req.body.status === "Shipped") {
    order.orderedItems.forEach(async (ord) => {
      await updateStock(ord.product, ord.quantity);
    });
  }

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({
    validateBeforeSave: false,
  });

  res.status(200).json({
    success: true,
    message: "Order status updated",
  });
});

async function updateStock(id, qty) {
  const product = await Product.findById(id);

  product.stock = product.stock - qty;

  await product.save({ validateBeforeSave: false });
}

// DELETE ORDER --ADMIN

exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("No order found", 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
    message: "Order deleted",
  });
});
