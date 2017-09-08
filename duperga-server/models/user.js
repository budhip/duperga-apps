
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    unique: [true, 'user already exist']
  },
  password: {
    type: String
  },
  role: {
    type: String,
    default: 'user'
  }
})

var User = mongoose.model('User', userSchema)

module.exports = User
