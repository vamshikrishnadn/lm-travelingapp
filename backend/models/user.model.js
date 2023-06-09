const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your first name'],
    maxlength: [30, 'Your name cannot extends 30 characters'],
  },
  gender: {
    type: String,
    required: [true, 'Please enter your Gender'],
    enum: ['Male', 'Female'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
    validate: [validator.isEmail, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minlength: [5, 'Password must be at least 5 characters'],
    maxlength: [20, 'Password cannot extends 20 characters'],
    select: false,
  },
  phone: {
    type: String,
    required: true,
    minlength: [10, 'Phone no. must be at least 10 numbers'],
    maxlength: [15, 'Phone no. cannot extends 15 numbers'],
  },
  // role: {
  //   type: String,
  //   default: 'employee',
  //   enum: ['employee', 'manager'],
  // },
  createdAt: { type: Date, default: Date.now },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

// Encrypting password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// 2nd step Compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// 1st step Return JWT token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

// Generate password reset token
userSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');
  // Hash and set to resetPasswordToken
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  // Set token expire time
  this.resetPasswordExpire = Date.now() + 3600000;
  return resetToken;
};

module.exports = mongoose.model('User', userSchema);
