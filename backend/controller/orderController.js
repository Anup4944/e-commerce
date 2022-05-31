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

// GET SINGLE ORDER --ADMIN

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

// logged in user order

exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  console.log(req.user._id);
  const order = await Order.find({ user: req.user._id });

  if (!order) {
    return next(new ErrorHandler("No order found", 404));
  }

  res.status(200).json({
    status: "success",
    order,
  });
});
