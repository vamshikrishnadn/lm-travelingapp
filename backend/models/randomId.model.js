const mongoose = require('mongoose');

const randomIdSchema = new mongoose.Schema({
  travelId: {
    type: Number,
    default: 1,
  },
  mangerId: {
    type: String,
    default: 'MGR001',
  },
});

module.exports = mongoose.model('RandId', randomIdSchema);
