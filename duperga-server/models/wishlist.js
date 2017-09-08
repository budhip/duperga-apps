var mongoose = require('mongoose')

var Schema = mongoose.Schema

var wishlistSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name must not nuull']
  },
  time_period: {
    type: [Number, 'time_period must a number']
  },
  current_saving: {
    type: Number
  },
  predicted_budget: {
    type: Schema.Types.Mixed
  },
  current_price: {
    type: Number
  },
  predicted_price: {
    type: Schema.Types.Mixed
  }
}, {timestamps: true})

var Wishlist = mongoose.model('Wishlist', wishlistSchema)

module.exports = Wishlist
