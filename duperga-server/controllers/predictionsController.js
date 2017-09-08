var Wishlist = require('../models/wishlist')
var algorithm = require('../algorithm/predict') // saving, interest, time

var predict = (req, res) => {
  let saving = req.body.curr_saving
  let interest = 0.09
  let time = req.body.time_period
  let predictBudget = algorithm.predictBudget(saving, interest, time)
  // let predicted_price = algorithm.predictPrice()

  let newWish = new Wishlist({
    name: req.body.name,
    time_period: time,
    current_saving: saving,
    predicted_budget: predicted_budget,
    current_price: current_price
  })

  res.send(predictBudget)
}


module.exports = { predict }
