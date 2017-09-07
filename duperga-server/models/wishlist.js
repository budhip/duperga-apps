var mongoose = require('mongoose')

var Schema = mongoose.Schema

var wishlistSchema = new Schema({
  name: {
    type: String
  },
  current_budget: {
    type: Number
  },
  predicted_budget: {
    type: Schema.Types.Mixed
  },
  current_price: {
    type: Number
  },
  predict_price: {
    type: Schema.Types.Mixed
  },
  userID: {
    type: { Schema.Types.ObjectId }
  }
})

var Wishlist = mongoose.model('Wishlist', wishlistSchema)

module.exports = Wishlist
