const crypto = require('crypto');

const User = require('../models/user.model');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const cloudinary = require('cloudinary');

// Register a user => /api/v1/registers
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  // console.log(req.body);
  const { email, password, role } = req.body;

  const verifyAccount = await User.findOne({ email });

  if (verifyAccount) {
    new ErrorHandler('Email already exists', 400);
    res.status(400).send({
      success: false,
      message: 'Email already exists',
    });
    return;
  }

  const user = await User.create({
    ...req.body,
  });
  sendToken(user, 200, res);
});

// Login User => /a[i]/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // 1. Check if email and password are present
  if (!email || !password) {
    return new ErrorHandler('Please provide email and password', 400);
  }
  // 2. Check if user exists
  var user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new ErrorHandler('Cant find your email or password', 401));
  }
  // Checks if password is correct or not
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    return next(new ErrorHandler('Incorrect password', 401));
  }
  var user = await User.findOne({ email }).select('-password');
  // const token = user.getJwtToken();
  sendToken(user, 200, res);
});

// Logout User => /api/v1/logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: 'Successfully logged out',
  });
});

// Get currently logged in user details => /api/v1/me
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({ success: true, payload: user });
});

// Updated / Change password  => /api/v1/password/update
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  // Check if old password is correct
  const isMatched = await user.comparePassword(req.body.oldPassword);
  if (!isMatched) {
    return next(new ErrorHandler('Old password is incorrect', 400));
  }
  user.password = req.body.password;
  await user.save();
  sendToken(user, 200, res);
});

// Updated / Change profile  => /api/v1/me/profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  if (req.body.email) {
    return res.status(400).send({ success: false, message: "Email can't editable." });
  }
  const user = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({ success: true, user });
});

// Admin routes

// Get all users => /api/v1/admin/users
exports.allUsers = catchAsyncErrors(async (req, res, next) => {
  // const allUsers = await User.find();
  // const resPerPage = 4;
  // const apiFeatures = new APIFeatures(User.find(), req.query)
  //   .search()
  //   .filter()
  //   .pagination(resPerPage);
  // const users = await apiFeatures.query;
  const users = await User.find({ _id: { $nin: [req.user._id] } });
  res.status(200).json({ success: true, payload: users });
});

// Get user details => /api/v1/admin/user/:id
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler(`User does not found with ie: ${req.params.id}`, 400));
  }
  res.status(200).json({ success: true, user });
});
