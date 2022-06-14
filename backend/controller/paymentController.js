const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "aud",
    metadata: {
      company: "Ecommerce",
    },
  });

  res.status(200).json({
    status: "success",
    client_secret: myPayment.client_secret,
  });
});

exports.sendStripeKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    stripeKey: process.env.STRIPE_PUB_KEY,
  });
});
