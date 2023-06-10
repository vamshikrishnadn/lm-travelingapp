const mongoose = require('mongoose');

const travelReviewSchema = new mongoose.Schema({
  reviewedDate: { type: Date, default: Date.now },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  reviewedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
  },
});

module.exports = mongoose.model('TravelReview', travelReviewSchema);
