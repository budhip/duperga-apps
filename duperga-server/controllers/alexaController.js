var Wishlist = require('../models/wishlist')
var algorithm = require('../algorithm/predict')

var save = (req, res) => {

  let bankInterest = 0.05
  let houseInterest = 0.05
  let inflation = 0.05
  let saving = req.body.current_saving
  let current_price = req.body.current_price
  let bankSaving = req.body.bank_saving
  let time = req.body.time_period
  // saving, bankInterest, time, bankSaving
  let predicted_budget = algorithm.predictBudget(saving, bankInterest, time, bankSaving)

  // curr_price, interest, inflation, time
  let predicted_price = algorithm.predictPrice(current_price, houseInterest, inflation, time)

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
    res.send(wish)
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

var predictSaving = (req, res) => {

  let bankInterest = 0.05
  let inflation = 0.05
  let houseInterest = 0.05
  let totalInterest = 1 + bankInterest

  let time = req.body.time_period
  let timeInYear = Math.ceil(time/12)
  let bankSaving = req.body.bank_saving * Math.pow(totalInterest, timeInYear)
  let current_price = req.body.current_price

  let predicted_price = algorithm.predictPrice(current_price, houseInterest, inflation, time)

  let toAlexa = {
    bank_saving: bankSaving,
    total_price: predicted_price[predicted_price.length - 1].price
  }
  res.send(toAlexa)

}

var predictMonthly = (req, res) => {
  let bankInterest = 0.05
  let houseInterest = 0.05
  let inflation = 0.05
  let saving = req.body.current_saving
  let current_price = req.body.current_price
  let bankSaving = req.body.bank_saving
  let time = req.body.time_period

  let predicted_budget = algorithm.predictBudget(saving, bankInterest, time, bankSaving)

  let predicted_price = algorithm.predictPrice(current_price, houseInterest, inflation, time)

  let toAlexa = {
    total_saving: predicted_budget[predicted_budget.length - 1].saving,
    last_month_saving: predicted_budget[predicted_budget.length - 1].month,
    last_year_saving: predicted_budget[predicted_budget.length - 1].year,
    total_price: predicted_price[predicted_price.length - 1].price,
    price_in_year: predicted_price[predicted_price.length - 1].year
  }
  res.send(toAlexa)
}

var predictAll = (req, res) => {

  let bankInterest = 0.05
  let houseInterest = 0.05
  let inflation = 0.05
  let saving = req.body.current_saving
  let current_price = req.body.current_price
  let bankSaving = req.body.bank_saving
  let time = req.body.time_period
  // saving, bankInterest, time
  let predicted_budget = algorithm.predictBudget(saving, bankInterest, time, bankSaving)

  // curr_price, interest, inflation, time
  let predicted_price = algorithm.predictPrice(current_price, houseInterest, inflation, time)

  let newWish = {
    name: req.body.name,
    time_period: time,
    current_saving: saving,
    bank_saving: req.body.bank_saving,
    current_price: current_price,
    predicted_budget: predicted_budget,
    predicted_price: predicted_price
  }
  res.send(newWish)
}


var getPredictSaving = (req, res) => {
  let inflation = 0.05
  let bankInterest = 0.05
  let houseInterest = 0.05
  let totalInterest = 1 + bankInterest

  let bankSaving = Math.floor(req.query.bank_saving * Math.pow(totalInterest, timeInYear))
  let current_price = req.query.current_price
  let time = req.query.time_period

  let predicted_price = algorithm.predictPrice(current_price, houseInterest, inflation, time)

  let toAlexa = {
    bank_saving: bankSaving,
    total_price: predicted_price[predicted_price.length - 1].price
  }
  res.send(toAlexa)
}

var getPredictMonthly = (req, res) => {
  let bankInterest = 0.05
  let houseInterest = 0.05
  let inflation = 0.05
  let saving = req.query.current_saving
  let current_price = req.query.current_price
  let bankSaving = req.query.bank_saving
  let time = req.query.time_period

  let predicted_budget = algorithm.predictBudget(saving, bankInterest, time, bankSaving)

  let predicted_price = algorithm.predictPrice(current_price, houseInterest, inflation, time)

  let toAlexa = {
    total_saving: predicted_budget[predicted_budget.length - 1].saving,
    last_month_saving: predicted_budget[predicted_budget.length - 1].month,
    last_year_saving: predicted_budget[predicted_budget.length - 1].year,
    total_price: predicted_price[predicted_price.length - 1].price,
    price_in_year: predicted_price[predicted_price.length - 1].year
  }
  res.send(toAlexa)
}

var getSave = (req, res) => {
  let bankInterest = 0.05
  let houseInterest = 0.05
  let inflation = 0.05
  let saving = req.query.current_saving
  let current_price = req.query.current_price
  let bankSaving = req.query.bank_saving
  let time = req.query.time_period
  // saving, bankInterest, time, bankSaving
  let predicted_budget = algorithm.predictBudget(saving, bankInterest, time, bankSaving)

  // curr_price, interest, inflation, time
  let predicted_price = algorithm.predictPrice(current_price, houseInterest, inflation, time)

  let newWish = new Wishlist({
    name: req.query.name,
    time_period: time,
    current_saving: saving,
    bank_saving: req.query.bank_saving,
    current_price: current_price,
    predicted_budget: predicted_budget,
    predicted_price: predicted_price
  })

  newWish.save()
  .then(wish => {
    res.send(wish)
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

var predictNewSaving = (req, res) => {
  let bank_saving = req.body.bank_saving
  let current_price = req.body.current_price
  let time_period = req.body.time_period
  let monthly_saving = req.body.current_saving

  let newSaving = algorithm.predictNewSaving(current_price, bank_saving, monthly_saving, time_period)
  res.send(newSaving)
}

var getPredictNewSaving = (req, res) => {
  let bank_saving = req.query.bank_saving
  let current_price = req.query.current_price
  let time_period = req.query.time_period
  let monthly_saving = req.query.current_saving

  let newSaving = algorithm.predictNewSaving(current_price, bank_saving, monthly_saving, time_period)
  res.send(newSaving)
}

module.exports = {
  save, predictSaving, predictMonthly, predictAll,
  getPredictSaving, getPredictMonthly, getSave, predictNewSaving, getPredictNewSaving
}
