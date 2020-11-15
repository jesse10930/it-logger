const mongoose = require('mongoose');

// declare tech schema with 3 categories
const TechSchema = mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('tech', TechSchema);
