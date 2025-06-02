const mongoose = require('mongoose')

const GallearySchema = new mongoose.Schema({
    name: String,
  media: {
    type:String,
    require:true
  },
  type: String,
})

module.exports = mongoose.model("Galleary",GallearySchema)