const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
  name: String,
  image: String,
  rating: Number,
  review: String,
});

module.exports = mongoose.model('Testimonial', TestimonialSchema);
