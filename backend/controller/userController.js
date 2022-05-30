const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const User = require("../models/User.js");
const sendToken = require("../utils/jwtToken.js");
const sendEmail = require("../utils/sendEmail.js");

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

// LOGIN USER
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

// LOGOUT USER
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnlt: true,
  });

  res.status(200).json({
    status: "success",
    message: "Logged out",
  });
});

// FORGOT PASSWORD

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  const resetPassToken = user.getResetPasswordToken();

  console.log(resetPassToken);

  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetPassToken}`;

  const message = `Reset your password by clicking on the link below: \n\n ${resetUrl}
  \n\n if you have not requested this email then please ignore it.
  `;

  try {
    await sendEmail({
      email: user.email,
      subject: `E-commerce : Password reset`,
      message,
    });

    res.status(200).json({
      status: "success",
      message: `Email sent to ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});
