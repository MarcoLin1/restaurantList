const mongoose = require('mongoose')
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  name_en: {
    type: String
  },
  category: {
    type: String,
    require: true
  },
  image: {
    type: String,
  },
  location: {
    type: String,
    require: true
  },
  phone: {
    type: String
  },
  google_map: {
    type: String
  },
  google_iframe: {
    type: String
  },
  rating: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    require: true
  }
})

module.exports = mongoose.model('Restaurant', restaurantSchema)