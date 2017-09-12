
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var inflationSchema = new Schema({
  year: {
    type: String
  },
  inflation: {
    type: Number
  },
  country: {
    type: String
  }
})

var Inflation = mongoose.model('Inflation', inflationSchema)

module.exports = Inflation
