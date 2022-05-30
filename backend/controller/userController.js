const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const User = require("../models/User.js");
const sendToken = require("../utils/jwtToken.js");

// REGISTER USER

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  //   let user = await User.findOne({ email });

  //   if (user) {
  //     return next(new ErrorHandler("User already exits", 400));
  //   }

  const user = await User.create({
    name,
    email,
    password,
    avatar: { public_id: "myCloud.public_id", url: "myCloud.secure_url" },
  });

  //   const token = user.generateToken();

  //   res.status(200).json({
  //     status: "success",
  //     token,
  //   });

  sendToken(user, 201, res);
});

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  //   const token = user.generateToken();

  //   res.status(200).json({
  //     status: "success",
  //     token,
  //   });

  sendToken(user, 200, res);
});
