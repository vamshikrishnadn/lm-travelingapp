const Travel = require('../models/travel.model.js');
const TravelRequests = require('../models/travel.request.model.js');
const TravelReview = require('../models/travel.review.model.js');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const moment = require('moment');
const User = require('../models/user.model.js');

exports.createTravel = catchAsyncErrors(async (req, res, next) => {
  const count = await Travel.count();
  const user = await User.findById(req.user._id);
  const travelId = user.name.substring(0, 4) + String(count + 1).padStart(3, '0');
  const travel = await Travel.create({
    ...req.body,
    travelId,
    createdBy: req.user._id,
  });

  res.status(201).json({
    success: true,
    payload: travel,
  });
});

exports.editTravel = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const travel = await Travel.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(201).json({ success: true, payload: travel });
});

exports.reviewUsers = catchAsyncErrors(async (req, res, next) => {
  const travels = await TravelRequests.find({
    requestedBy: req.user._id,
    status: 'Accept',
  }).populate('requestedTo');

  res.status(201).json({ success: true, payload: travels });
});

exports.getTravelDetails = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const travel = await Travel.findById(id).populate('createdBy');

  res.status(201).json({ success: true, payload: travel });
});

exports.deleteTravel = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  await Travel.findByIdAndDelete(id);

  res.status(201).json({ success: true, payload: 'Successfully deleted.' });
});

exports.otherTravels = catchAsyncErrors(async (req, res, next) => {
  const travels = await Travel.find({
    createdBy: { $nin: [req.user._id] },
    travelDate: { $gte: moment().subtract(1, 'day').format() },
  })
    .populate('createdBy')
    .sort('travelDate');

  res.status(201).json({ success: true, payload: travels });
});

exports.myTravels = catchAsyncErrors(async (req, res, next) => {
  const travels = await Travel.find({
    createdBy: { $in: [req.user._id] },
  }).populate('createdBy');

  res.status(201).json({ success: true, payload: travels });
});

exports.sendRequest = catchAsyncErrors(async (req, res, next) => {
  const findTravel = await TravelRequests.findOne({
    ...req.body,
    requestedBy: req.user._id,
  });

  if (findTravel) {
    return next(new ErrorHandler('Request already sent.', 401));
  }
  const travel = await TravelRequests.create({
    ...req.body,
    requestedBy: req.user._id,
  });

  res.status(200).json({ success: true, payload: travel });
});

exports.sentRequests = catchAsyncErrors(async (req, res, next) => {
  const requests = await TravelRequests.find({
    requestedBy: req.user._id,
  }).populate('requestedBy requestedTo travel');

  res.status(200).json({ success: true, payload: requests });
});

exports.receivedRequests = catchAsyncErrors(async (req, res, next) => {
  const requests = await TravelRequests.find({
    requestedTo: req.user._id,
  }).populate('requestedBy requestedTo travel');

  res.status(200).json({ success: true, payload: requests });
});

exports.updateStatusRequests = catchAsyncErrors(async (req, res, next) => {
  const request = await TravelRequests.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({ success: true, payload: request });
});

exports.getSingTravelRequest = catchAsyncErrors(async (req, res, next) => {
  const request = await TravelRequests.find({
    _id: req.params.id,
  }).populate('requestedBy requestedTo travel');

  res.status(200).json({ success: true, payload: request });
});

exports.createTravelReview = catchAsyncErrors(async (req, res, next) => {
  const reviewAdded = await TravelReview.findOne({
    reviewedBy: req.user._id,
    reviewedTo: req.body.reviewedTo,
  });
  if (reviewAdded) {
    return next(new ErrorHandler('Review already added.', 401));
  }
  const review = await TravelReview.create({
    ...req.body,
    reviewedBy: req.user._id,
  });

  res.status(200).json({ success: true, payload: review });
});

exports.getTravelReview = catchAsyncErrors(async (req, res, next) => {
  const reviews = await TravelReview.find({
    reviewedTo: req.params.id,
  }).populate('reviewedBy reviewedTo');

  res.status(200).json({ success: true, payload: reviews });
});

exports.getMyTravelReviews = catchAsyncErrors(async (req, res, next) => {
  const reviews = await TravelReview.find({
    reviewedTo: req.user._id,
  }).populate('reviewedBy reviewedTo');

  res.status(200).json({ success: true, payload: reviews });
});
