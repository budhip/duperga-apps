
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

inflationSchema.statics.getConfig = (attr_name) => {
  config = {
    bankInterest: 0.05,
    houseInterest: 0.05,
    year: new Date().getFullYear()
  }

  return config[attr_name]

}

inflationSchema.statics.predictSaving = (current_price, time, cb) => {

  let inflation = this.getConfig('inflation')
  let houseInterest = this.getConfig('houseInterest')
  let year = this.getConfig('year')

  this.findOne({year: year})
  .then(({inflation}) => {
    inflation = inflation / 100

    let predicted_price = algorithm.predictPrice(current_price, houseInterest, inflation, time)

    try {
      var toAlexa = {
        bank_saving: bankSaving,
        total_price: predicted_price[predicted_price.length - 1].price
      }
    }
    catch (err) {
      console.log(err)
      var toAlexa= {
        bank_saving: null,
        total_price: null
      }
    }
    cb(true, toAlexa)
  })
  .catch(err => cb(false, error))
}

inflationSchema.statics.getCurrentPrice = () => {
  
}

var Inflation = mongoose.model('Inflation', inflationSchema)

module.exports = Inflation
