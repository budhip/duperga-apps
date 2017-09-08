
var calculateBudget = (saving, interest, time) => {
  var budget_arr = []
  let total = 0
  let total_interest = 1 + interest
  let saving_annualy = saving * 12
  let i = 1

  if (time < 12) {
    let arr = []
    total = Math.floor(saving_annualy * Math.pow(total_interest, 1) / 12)
    arr.push(total)
    return arr
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

var calculatePrice = (curr_price, interest, inflation, timeInMonth) => {
  let timeInYear = Math.ceil(timeInMonth/12)
  let total_interest = 1 + interest
  let total = 0
  let prices = []

  for (let i = 0; i < timeInYear; i++) {
    total = Math.floor(curr_price * Math.pow(total_interest, i))
    prices.push(total)
  }
  return prices
}

var generateNewMonths = (monthsArr, firstMonth) => {
  let head = monthsArr.splice(firstMonth)
  let newMonths = head.concat(monthsArr)
  return newMonths
}

var predictPrice = (curr_price, interest, inflation=0.03, time) => {

  let curr_year = new Date().getFullYear()
  let yearly_price = calculatePrice(curr_price, interest, inflation, time)

  let predicted_price = []
  for (let i = 0; i < yearly_price.length; i++) {
    let year = curr_year + i
    predicted_price.push( { year: year, price: yearly_price[i]})
  }
  return predicted_price
}

var predictBudget = (curr_saving, interest, time) => {

  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  let monthly_budgets = calculateBudget(curr_saving, interest, time)

  let curr_month_idx = new Date().getMonth()
  let curr_year = new Date().getFullYear()
  let newMonthsArr = generateNewMonths(months, curr_month_idx)

  let predicted_budget = []
  let newTime = null

  for (let i = 0; i < monthly_budgets.length; i++) {
    let tmp = []
    for (let j = 0; j < newMonthsArr.length; j++) {
      let data = {
        month: newMonthsArr[j], saving: monthly_budgets[i]
      }
      if (newMonthsArr[j] === 'January' && j !== 0) {
        curr_year++
        data.year = curr_year
      } else {
        data.year = curr_year
      }
      tmp.push(data)
      time--
      if (time === 0) break
    }
    predicted_budget.push(...tmp)
  }
  return predicted_budget
}

module.exports = { predictBudget, predictPrice };
