const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  rollNumber: { type: String, required: true, unique: true },
  name: String,
  course: String,
  completionDate: Date,
  certificateUrl: String // PDF/image of certificate stored in uploads or cloud
});

module.exports = mongoose.model('Certificate', certificateSchema);
