
var chai = require('chai')
var should = chai.should()
var axios = require('./axios_config')

describe(`GET /alexa/predictMonthly`, () => {

  let houseToPredict = {
    params: {
      name: 'Rumah di Pakubuwono',
      time_period: 5,
      current_price: 500000000,
      bank_saving: 10000000,
      current_saving: 5000000
    }
  }

  let secondHouseToPredict = {
    params: {
      name: 'Rumah di Pakubuwono',
      time_period: 14,
      current_price: 500000000,
      bank_saving: 10000000,
      current_saving: 5000000
    }
  }

  it('response data should an object', done => {
    axios.get('/alexa/predictMonthly', houseToPredict)
    .then(resp => {
      resp.data.should.an('object')
      done()
    })
    .catch(err => {
      console.log(err)
      err.should.not.exist
      done()
    })
  })

  it('should have 5 properties', done => {
    axios.get('/alexa/predictMonthly', houseToPredict)
    .then(resp => {
      Object.keys(resp.data).length.should.equal(5)
      done()
    })
    .catch(err => {
      err.should.not.exist
      done()
    })
  })

  it('properties of predictMonthly response should not null', done => {
    axios.get('/alexa/predictMonthly', houseToPredict)
    .then(resp => {
      resp.data.total_saving.should.not.equal(null)
      resp.data.last_month_saving.should.not.equal(null)
      resp.data.last_year_saving.should.not.equal(null)
      resp.data.total_price.should.not.equal(null)
      resp.data.price_in_year.should.not.equal(null)
      done()
    })
    .catch(err => {
      err.should.not.exist
      done()
    })
  })

  it('total_saving should more than 35.000.000', done => {
    axios.get('/alexa/predictMonthly', houseToPredict)
    .then(resp => {
      let status = resp.data.total_saving >= 35000000
      status.should.equal(true)
      done()
    })
    .catch(err => {
      err.should.not.exist
      done()
    })
  })

  it('last_month_saving should be February', done => {
    axios.get('/alexa/predictMonthly', houseToPredict)
    .then(resp => {
      resp.data.last_month_saving.should.equal('February')
      done()
    })
    .catch(err => {
      err.should.not.exist
      done()
    })
  })

  it('last_year_saving should be 2018', done => {
    axios.get('/alexa/predictMonthly', houseToPredict)
    .then(resp => {      
      resp.data.last_year_saving.should.equal(2018)
      done()
    })
    .catch(err => {
      err.should.not.exist
      done()
    })
  })

  it('total_price property should still 500000000. Because time_period less than 12 months', done => {
    axios.get('/alexa/predictMonthly', houseToPredict)
    .then(resp => {
      resp.data.total_price.should.equal(500000000)
      done()
    })
    .catch(err => {
      err.should.not.exist
      done()
    })
  })
  //
  it('With second data total_price property should more than 500000000. Because time_period more than 12 months', done => {
    axios.get('/alexa/predictMonthly', secondHouseToPredict)
    .then(resp => {
      let status = resp.data.total_price >= 500000000
      status.should.equal(true)
      done()
    })
    .catch(err => {
      err.should.not.exist
      done()
    })
  })

})
