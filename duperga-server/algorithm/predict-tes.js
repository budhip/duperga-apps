var s = 1000000
var i = 0.1
var t = 25
var b = 20000
var arr = []
var newSaving = 0


var generateNewMonths = (monthsArr, firstMonth, time) => {
  let iterate = Math.ceil(time / 12)
  let head = monthsArr.splice(firstMonth)
  let newMonths = head.concat(monthsArr)
  return newMonths
}

function calculateBudget(saving, interest, time) {
  let total_interest = 1 + interest
  var totalMoney = 0
  let history = []
  for (let i = 1; i <= time; i++) {
    var myMoney = Math.floor(saving * Math.pow(total_interest, i))
    totalMoney += myMoney
    history.push(totalMoney)
  }
  return history
}

var predictBudget = (curr_saving, interest, time) => {

  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  let monthly_budgets = calculateBudget(curr_saving, interest, time)

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

console.log(predictBudget(s,i,t))
console.log(predictBudget(s,i,t).length)
