
function calculateBudget (monthly_saving, interest, time, bank_saving) {
  let total_interest = 1 + interest
  console.log(`total interestnya ${interest}`)
  let monthly_saving_hist = []

  for (let i = 1; i <= time; i++) {
    bank_saving += monthly_saving
    monthly_saving_hist.push(bank_saving)
  }

  let monthly_interest = 0
  for (let i = 0; i < time; i++) {
    if (i % 12 === 0) {
      monthly_interest = Math.floor((((monthly_saving_hist[i] + (12 * monthly_saving)) * total_interest) - monthly_saving_hist[i]) / 12)
    }
    monthly_saving_hist[i] = monthly_saving_hist[i] + monthly_interest
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

var predictPrice = (curr_price, interest, inflation=0.05, time) => {

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

module.exports = { predictBudget, predictPrice };
