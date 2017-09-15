

var Wishlist = require('../models/wishlist')
var Inflation = require('../models/inflation')
var algorithm = require('../algorithm/predict')
var axios = require('axios')
const cheerio = require('cheerio')

var predictAll = (req, res) => {

  let bankInterest = 0.05
  let houseInterest = 0.05
  // let inflation = 0.05
  let year = new Date().getFullYear()

  Inflation.findOne({year: year})
  .then(({inflation}) => {

    inflation = inflation / 100

    let saving = req.query.current_saving
    let current_price = req.query.current_price
    let bankSaving = req.query.bank_saving
    let time = req.query.time_period
    // saving, bankInterest, time
    let predicted_budget = algorithm.predictBudget(saving, bankInterest, time, bankSaving)

    // curr_price, interest, inflation, time
    let predicted_price = algorithm.predictPrice(current_price, houseInterest, inflation, time)

    try {
      var newWish = {
        name: req.query.name,
        time_period: time,
        current_saving: saving,
        bank_saving: bankSaving,
        current_price: current_price,
        predicted_budget: predicted_budget,
        predicted_price: predicted_price
      }
    } catch (e) {
      console.log(e)
      var newWish = {
        name: null,
        time_period: null,
        current_saving: null,
        bank_saving: null,
        current_price: null,
        predicted_budget: null,
        predicted_price: null
      }
    }
    res.send(newWish)

  })
  .catch(err => console.log(err))

}

var getPredictSaving = (req, res) => {

  // let inflation = 0.05
  let bankInterest = 0.05
  let houseInterest = 0.05
  let totalInterest = 1 + bankInterest

  let time = req.query.time_period
  let year = new Date().getFullYear()
  let timeInYear = Math.ceil(time/12)

  let bankSaving = Math.floor(req.query.bank_saving * Math.pow(totalInterest, timeInYear))
  let current_price = req.query.current_price

  Inflation.findOne({year: year})
  .then(({inflation}) => {
    inflation = inflation / 100

    let predicted_price = algorithm.predictPrice(current_price, houseInterest, inflation, time)

    try {
      var toAlexa = {
        bank_saving: bankSaving,
        total_price: predicted_price[predicted_price.length - 1].price
      }
    }
    catch (err) {
      console.log(err)
      var toAlexa= {
        bank_saving: null,
        total_price: null
      }
    }
    res.send(toAlexa)
  })
  .catch(err => console.log(err))

}

var getPredictMonthly = (req, res) => {
  let bankInterest = 0.05
  let houseInterest = 0.05
  // let inflation = 0.05
  let year = new Date().getFullYear()
  // let inflation = await getInflation(year)
  let saving = req.query.current_saving
  let current_price = req.query.current_price
  let bankSaving = req.query.bank_saving
  let time = req.query.time_period

  Inflation.findOne({ year: year })
  .then(({inflation}) => {

    inflation = inflation / 100

    let predicted_budget = algorithm.predictBudget(saving, bankInterest, time, bankSaving)

    let predicted_price = algorithm.predictPrice(current_price, houseInterest, inflation, time)

    try {
      var toAlexa = {
        total_saving: predicted_budget[predicted_budget.length - 1].saving,
        last_month_saving: predicted_budget[predicted_budget.length - 1].month,
        last_year_saving: predicted_budget[predicted_budget.length - 1].year,
        total_price: predicted_price[predicted_price.length - 1].price,
        price_in_year: predicted_price[predicted_price.length - 1].year
      }
    }

    catch (err) {
      console.log()
      var toAlexa = {
        total_saving: null,
        last_month_saving: null,
        last_year_saving: null,
        total_price: null,
        price_in_year: null
      }
    }

    res.send(toAlexa)

  })
  .catch(err => console.log(err))

}

var getSave = (req, res) => {
  let bankInterest = 0.05
  let houseInterest = 0.05
  // let inflation = 0.05

  let year = new Date().getFullYear()

  let name = req.query.name
  let saving = req.query.current_saving
  let current_price = req.query.current_price
  let bankSaving = req.query.bank_saving
  let time = req.query.time_period
  // saving, bankInterest, time, bankSaving

  Inflation.findOne({ year: year })
  .then(({inflation}) => {

    inflation = inflation / 100
    let predicted_budget = algorithm.predictBudget(saving, bankInterest, time, bankSaving)

    // curr_price, interest, inflation, time
    let predicted_price = algorithm.predictPrice(current_price, houseInterest, inflation, time)

    try {
      var wish = {
        name: req.query.name,
        time_period: time,
        current_saving: saving,
        bank_saving: req.query.bank_saving,
        current_price: current_price,
        predicted_budget: predicted_budget,
        predicted_price: predicted_price
      }
    } catch (e) {
      console.log(e)
      var wish = {
        name: null,
        time_period: null,
        current_saving: null,
        bank_saving: null,
        current_price: null,
        predicted_budget: null,
        predicted_price: null
      }
    }

    let newWish = new Wishlist(wish)

    newWish.save()
    .then(wish => {
      res.send(wish)
    })
    .catch(err => {
      res.status(500).send(err)
    })

  })

}

var getPredictNewSaving = (req, res) => {

  let year = new Date().getFullYear()
  let bank_saving = req.query.bank_saving
  let current_price = req.query.current_price
  let time_period = req.query.time_period
  let monthly_saving = req.query.current_saving

  Inflation.findOne({year: year})
  .then(({inflation}) => {

    inflation = inflation / 100
    try {
      var newSaving = algorithm.predictNewSaving(current_price, bank_saving, monthly_saving, time_period, inflation)
    } catch (e) {
      console.log(e)
      var newSaving = {new_time: null, new_saving: null}
    }
    res.send(newSaving)
  })

}

var searchPrice = (req, res) => {
  var url = `http://rumahdijual.com/carirumah.php?transaksi=BELI&jenis=RUMAH&kota=Bandung&minprice=&maxprice=500000000&ltmin=0&ktmin=0&q=&sort=0`
  var regxJuta = /\s?juta/i
  var regxMiliar = /\s?miliar/i

  axios.get(url)
  .then(resp => {
    let pageString = resp.data
    const $ = cheerio.load(pageString)
    let tdInfoSpec = $('td.tdInfoSpec').get()
    let tdTitleDesc = $('.TdTitleDesc').get()

    let houses = []

    for (let i = 0; i < tdInfoSpec.length; i++) {
      let rawHarga = tdInfoSpec[i].children[0].children[0].data
      let harga
      if (regxJuta.test(rawHarga)) {
        harga = rawHarga.replace(regxJuta, '000000')
      } else {
        harga = rawHarga.replace(regxMiliar, '000000000')
      }

      let house = {
        harga: +harga,
        wilayah: tdTitleDesc[i].children[2].children[2].children[1].children[0].data,
        luas_tanah: tdInfoSpec[i].children[0].next.children[0].data,
        luas_bangunan: tdInfoSpec[i].children[1].next.children[0].data,
        jumlah_kamar: tdInfoSpec[i].children[3].children[0].children[0].data,
        alamat: tdTitleDesc[i].children[0].next.next.next.children[0].data,
        url: tdTitleDesc[i].children[0].next.children[0].children[0].attribs.href
      }
      houses.push(house)
    }
    res.send(houses)
  })
  .catch(err => {
    res.send(err)
  })

}

var searchWishlist = (req, res) => {
  let wishListName = req.query.name

  Wishlist.find({name: new RegExp(wishListName, "gi")})
  .then(found => {
    res.send(found)
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

var deleteWishlist = (req, res) => {
  let wishListName = req.query.name

  if (wishListName === '') {
    res.send('wish name cannot null')
    return 1
  }


  Wishlist.findOneAndRemove({ name: new RegExp(wishListName, "gi")})
  .then(removed => {
    res.send(removed)
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

module.exports = {
  predictAll, getPredictSaving, getPredictMonthly, getSave, getPredictNewSaving, searchPrice, searchWishlist, deleteWishlist
}
