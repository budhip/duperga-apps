var Wishlist = require('../models/wishlist')
var algorithm = require('../algorithm/predict')

var save = (req, res) => {

  let saving = req.body.current_saving
  let current_price = req.body.current_price
  let bankInterest = 0.09
  let bankSaving = req.body.bank_saving
  let houseInterest = 0.2
  let time = req.body.time_period
  // saving, bankInterest, time, bankSaving
  let predicted_budget = algorithm.predictBudget(saving, bankInterest, time, bankSaving)

  // curr_price, interest, inflation, time
  let predicted_price = algorithm.predictPrice(current_price, houseInterest, 0.03, time)

  let newWish = new Wishlist({
    name: req.body.name,
    time_period: time,
    current_saving: saving,
    bank_saving: req.body.bank_saving,
    current_price: current_price,
    predicted_budget: predicted_budget,
    predicted_price: predicted_price
  })

  newWish.save()
  .then(wish => {
    console.log(`- masuk bener`)
    res.send(wish)
  })
  .catch(err => {
    console.log(`- masuk err`)
    res.status(500).send(err)
  })
}

var predictMonthly = (req, res) => {
  let saving = req.body.current_saving
  let current_price = req.body.current_price
  let bankInterest = 0.09
  let bankSaving = req.body.bank_saving
  let houseInterest = 0.2
  let time = req.body.time_period

  let predicted_budget = algorithm.predictBudget(saving, bankInterest, time, bankSaving)

  let predicted_price = algorithm.predictPrice(current_price, houseInterest, 0.03, time)

  let toAlexa = {
    total_saving: predicted_budget[predicted_budget.length - 1].saving,
    last_month_saving: predicted_budget[predicted_budget.length - 1].month,
    last_year_saving: predicted_budget[predicted_budget.length - 1].year,
    total_price: predicted_price[predicted_price.length - 1].price,
    price_in_year: predicted_price[predicted_price.length - 1].year
  }
  res.send(toAlexa)
}

var predictSaving = (req, res) => {

  let bankSaving = req.body.bank_saving
  let current_price = req.body.current_price
  let houseInterest = 0.2
  let time = req.body.time_period

  let predicted_price = algorithm.predictPrice(current_price, houseInterest, 0.03, time)

  let toAlexa = {
    bank_saving: bankSaving,
    total_price: predicted_price[predicted_price.length - 1].price
  }
  res.send(toAlexa)

}

module.exports = { save, predictSaving, predictMonthly }
