var Wishlist = require('../models/wishlist')

var calculateBudget = (saving, interest, time) => {
  var budget_arr = []
  let total = 0
  let total_interest = 1 + interest
  let saving_annualy = saving * 12
  let i = 1

  if (time < 12) {
    total = Math.floor(saving_annualy * Math.pow(total_interest, 1) / 12)
    return total
  }

  while (time >= 12) {
    total = saving_annualy * Math.pow(total_interest, i)
    budget_arr.push(total)
    i++
    time -= 12
  }

  let last_year_budget = budget_arr[budget_arr.length - 1] * Math.pow(total_interest, i++)
  budget_arr.push(last_year_budget)
  var budget_per_month = budget_arr.map(b => Math.floor(b/12))
  return budget_per_month
}

var predict = (req, res) => {
  let interest = 0.01
  let curr_saving = req.body.current_saving
  let curr_price = req.body.current_price
  let time = req.body.time_period
  calculateBudget(curr_saving, interest, time)

}

module.exports = {
  predictPrice
};
