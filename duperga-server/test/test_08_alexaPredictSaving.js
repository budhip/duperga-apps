
var chai = require('chai')
var should = chai.should()
var axios = require('./axios_config')

describe(`GET /alexa/predictSaving`, () => {

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

  it('Response type should an object', done => {
    axios.get('/alexa/predictSaving', houseToPredict)
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

  it('Response data should have 2 properties', done => {
    axios.get('/alexa/predictSaving', houseToPredict)
    .then(resp => {
      Object.keys(resp.data).length.should.equal(2)
      done()
    })
    .catch(err => {
      err.should.not.exist
      done()
    })
  })

  it('properties of predictSaving response should not null', done => {
    axios.get('/alexa/predictSaving', houseToPredict)
    .then(resp => {
      resp.data.bank_saving.should.not.equal(null)
      resp.data.total_price.should.not.equal(null)
      done()
    })
    .catch(err => {
      err.should.not.exist
      done()
    })
  })

  it('bank_saving property should equal to 10000000', done => {
    axios.get('/alexa/predictSaving', houseToPredict)
    .then(resp => {
      resp.data.bank_saving.should.equal(10000000)
      done()
    })
    .catch(err => {
      err.should.not.exist
      done()
    })
  })

  it('total_price should not more than 500000000. Because it less than 12 month', done => {
    axios.get('/alexa/predictSaving', houseToPredict)
    .then(resp => {
      resp.data.total_price.should.equal(500000000)
      done()
    })
    .catch(err => {
      err.should.not.exist
      done()
    })
  })

  it('With second data bank_saving property should more than 10000000. Because time_period more than 12 months', done => {
    axios.get('/alexa/predictSaving', secondHouseToPredict)
    .then(resp => {
      resp.data.bank_saving.should.not.equal(10000000)
      done()
    })
    .catch(err => {
      err.should.not.exist
      done()
    })
  })

  it('With second data total_price property should more than 500000000. Because time_period more than 12 months', done => {
    axios.get('/alexa/predictSaving', secondHouseToPredict)
    .then(resp => {
      resp.data.bank_saving.should.not.equal(500000000)
      done()
    })
    .catch(err => {
      err.should.not.exist
      done()
    })
  })

})
