var Wishlist = require('../models/wishlist')
var algorithm = require('../algorithm/predict')

var predict = (req, res) => {

  let saving = req.body.current_saving
  let current_price = req.body.current_price
  let bankInterest = 0.09
  let bankSaving = req.body.bank_saving
  let houseInterest = 0.2
  let time = req.body.time_period
  // saving, bankInterest, time
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
    res.send(wish)
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

module.exports = { predict }
