
var calculateBudget = (monthly_saving, interest, time, bank_saving) => {
  let total_interest = 1 + interest
  var totalMoney = 0
  let budgets = []
  for (let i = 1; i <= time; i++) {
    var myMoney = Math.floor(monthly_saving * Math.pow(total_interest, i))
    totalMoney += myMoney
    budgets.push(totalMoney)
  }  
  let totalBudget = budgets.map(b => b + parseInt(bank_saving))
  return totalBudget
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

var predictBudget = (curr_saving, interest, time, bank_saving) => {

  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  let monthly_budgets = calculateBudget(curr_saving, interest, time, bank_saving)

  let curr_month_idx = new Date().getMonth()
  let curr_year = new Date().getFullYear()
  let newMonthsArr = generateNewMonths(months, curr_month_idx, time)

  let predicted_budget = []
  let newTime = null
  let monthIdx = 0

  for (let j = 0; j < time; j++) {
    let data = {
      month: newMonthsArr[monthIdx], saving: monthly_budgets[j]
    }
    if (newMonthsArr[monthIdx] === 'January' && j !== 0) {
      curr_year++
      data.year = curr_year
    } else {
      data.year = curr_year
    }
    if (j % 12 === 0 && j !== 0) {
      monthIdx = 0
    } else {
      monthIdx++
    }
    predicted_budget.push(data)
  }
  return predicted_budget
}

module.exports = { predictBudget, predictPrice };
