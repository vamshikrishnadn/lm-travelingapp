const mongoose = require('mongoose');

const travelSchema = new mongoose.Schema({
  travelId: {
    type: String,
    required: true,
    default: 'TRA001',
  },
  vehicleMade: {
    type: String,
    required: [true, 'Please enter your first vehicle details'],
  },
  vehicleModel: {
    type: String,
    required: [true, 'Please enter your first vehicle model'],
  },
  vehicleNumber: {
    type: String,
    required: [true, 'Please enter your first vehicle number'],
  },
  licenseNumber: {
    type: String,
    required: [true, 'Please enter your first License Number'],
  },
  createdAt: { type: Date, default: Date.now },
  fuelType: {
    type: String,
    required: [true, 'Please enter fuel type'],
    enum: ['Petrol', 'Diesel'],
  },
  setter: {
    type: Number,
    required: [true, 'Please enter number of setter.'],
  },
  travelMembersCount: {
    type: Number,
    required: [true, 'Please enter number of travel Members Count.'],
  },
  from: {
    type: String,
    required: [true, 'Please enter starting place'],
  },
  to: {
    type: String,
    required: [true, 'Please enter destination place'],
  },
  via: {
    type: String,
  },
  travelDate: {
    type: Date,
    required: [true, 'Please enter travel date'],
  },
  travelTime: {
    from: {
      type: String,
      required: [true, 'Please enter travel time'],
    },
    to: {
      type: String,
      required: [true, 'Please enter travel time'],
    },
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Travel', travelSchema);
