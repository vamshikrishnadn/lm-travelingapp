const mongoose = require('mongoose');

const travelRequestSchema = new mongoose.Schema({
  requestedDate: { type: Date, default: Date.now },
  requestedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  requestedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  travel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Travel',
    required: true,
  },
  status: {
    type: String,
    enum: ['Accept', 'Reject', 'Pending'],
    default: 'Pending',
  },
  comment: {
    type: String,
  },
});

module.exports = mongoose.model('TravelRequest', travelRequestSchema);
