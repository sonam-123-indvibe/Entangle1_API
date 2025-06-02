const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: String,
  image: String,
  subcategories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubCategory'
    }
  ]
});

module.exports = mongoose.model('Course', courseSchema);
