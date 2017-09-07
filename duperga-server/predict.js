
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


var predict = () => {  
  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  let interest = 0.01
  let curr_saving = 1000000  
  let time = 25
  let monthly_budgets = calculateBudget(curr_saving, interest, time)
  console.log(monthly_budgets)
  let predicted_budget = []
  for (let i = 0; i < monthly_budgets.length; i ++) {
    let curr_month_idx = new Date().getMonth()
    predicted_budget.push({
      month: months[curr_month_idx + i+1],
      price: monthly_budgets[i]
    })
  }  
  return predicted_budget
}

console.log(predict())

