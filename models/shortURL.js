const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortURLSchema = new Schema ({
  origin_URL: {
    type: URL,
    required: true
  },
  short_URL: {
    type: URL,
    required: true
  }
})

module.exports = mongoose.model('ShortURL', shortURLSchema)