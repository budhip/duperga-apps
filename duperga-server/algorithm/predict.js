
var Inflation = require('../models/inflation')


function calculateBudget (monthly_saving, interest, time, bank_saving) {
  let monthly_saving_hist = []
  for (let i = 0; i < time; i++) {
    bank_saving += monthly_saving
    // 0.082 = 30 / 365
    let newSaving = Math.floor((bank_saving * interest * 0.082) + bank_saving)
    monthly_saving_hist.push(newSaving)
  }
  return monthly_saving_hist
}

var calculatePrice = (curr_price, interest, inflation, timeInMonth) => {

  let timeInYear = Math.ceil(timeInMonth/12)

  if (timeInMonth < 12) {
    return [curr_price]
  }

  let total_interest = 1 + inflation
  let total = 0
  let prices = []

  for (let i = 0; i <= timeInYear; i++) {
    total = Math.floor(curr_price * Math.pow(total_interest, i))
    prices.push(total)
  }
  return prices
}

function calculateTime(monthly_saving, interest, lastPrice, bank_saving, time_period) {
  let predictedBudget = calculateBudget(+monthly_saving, +interest, +time_period, +bank_saving)
  let lastBudget = predictedBudget[predictedBudget.length - 1]
  let current_term = +time_period

  let newTime = Math.ceil((lastPrice - lastBudget)/monthly_saving) + current_term
  return newTime
}

var generateNewMonths = (monthsArr, firstMonth) => {
  let head = monthsArr.splice(firstMonth)
  let newMonths = head.concat(monthsArr)
  return newMonths
}

function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() + 1;
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}

var predictPrice = (curr_price, interest, inflation, time) => {

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

  let monthly_budgets = calculateBudget(parseInt(curr_saving), interest, parseInt(time), parseInt(bank_saving))

  let curr_month_idx = new Date().getMonth()
  let curr_year = new Date().getFullYear()
  let newMonthsArr = generateNewMonths(months, curr_month_idx, time)

  let predicted_budget = []
  let newTime = null
  let monthIdx = 1

  for (let j = 0; j < time; j++) {
    // console.log(`urutan bulan ${newMonthsArr[monthIdx]}: ${monthIdx}`)
    let data = {
      month: newMonthsArr[monthIdx], saving: monthly_budgets[j]
    }
    if (newMonthsArr[monthIdx] === 'January' && j !== 0) {
      curr_year++
      data.year = curr_year
    } else {
      data.year = curr_year
    }
    if (monthIdx == 11 && j !== 0) {
      monthIdx = 0
      // data.month = newMonthsArr[monthIdx]
    } else {
      monthIdx++
    }
    predicted_budget.push(data)
  }
  return predicted_budget
}

var predictNewSaving = (current_price, bank_saving, monthly_saving, time_period, inflation) => {
  let bankInterest = 0.05
  let predictedPrice = calculatePrice(current_price, interest=0.05, inflation, time_period)
  let lastPrice = predictedPrice[predictedPrice.length - 1]
  let newSaving = Math.floor((bank_saving - lastPrice) / time_period) * -1
  let newTime = calculateTime(monthly_saving, bankInterest, lastPrice, bank_saving, time_period)
  return {
    new_time: newTime,
    new_saving: newSaving
  }
}

module.exports = { predictBudget, predictPrice, predictNewSaving };
