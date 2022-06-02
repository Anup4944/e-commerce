const Product = require("../models/Product.js");
const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const ApiFeatures = require("../utils/apiFeatures.js");

// CREATE -- ADMIN

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(200).json({
    status: "success",
    message: "Product created",
    product,
  });
});

// GET ALL PRODUCTS

exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 8;

  const productCount = await Product.countDocuments();
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  const products = await apiFeature.query;

  res.status(200).json({ status: "success", products, productCount });
});

// GET SINGLE PRODUCTS

exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product does not exits", 404));
  }

  res.status(200).json({
    status: "success",
    product,
  });
});

// UPDATE PRODUCT --Admin

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindandModify: false,
  });

  res.status(200).json({
    status: "success",
    product,
  });
});

// DELETE -- Admin

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  await product.remove();

  res.status(200).json({
    status: "success",
    message: "Product has been deleted",
  });
});

// CREATE REVIEW OR UPDATE THE REVIEW

exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((item) => {
      if (item.user.toString() === req.user._id.toString()) {
        (item.rating = rating), (item.comment = comment);
      }
    });
  } else {
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
  }
  let average = 0;
  product.reviews.forEach((rev) => {
    average += rev.rating;
  });

  product.ratings = average / product.reviews.length;

  await product.save({
    validateBeforeSave: false,
  });

  res.status(200).json({
    status: "success",
    message: "Review added",
  });
});

// Get all review of single product

exports.getProductReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    status: "success",
    reviews: product.reviews,
  });
});

// Delete reviews

exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let average = 0;
  reviews.forEach((rev) => {
    average += rev.rating;
  });

  ratings = average / reviews.length;

  const numReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    { reviews, ratings, numReviews },
    {
      new: true,
      runValidator: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    status: "success",
    message: "Review deleted",
  });
});
