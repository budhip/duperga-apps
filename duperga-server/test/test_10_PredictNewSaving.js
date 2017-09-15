
var chai = require('chai')
var should = chai.should()
var axios = require('./axios_config')

describe(`GET /alexa/predictNewSaving`, () => {

  let houseToPredict = {
    params: {
      name: 'Rumah di Pakubuwono',
      time_period: 5,
      current_price: 500000000,
      bank_saving: 10000000,
      current_saving: 5000000
    }
  }

  it('response data should an object', done => {
    axios.get('/alexa/predictNewSaving', houseToPredict)
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

  it('should have 2 properties', done => {
    axios.get('/alexa/predictNewSaving', houseToPredict)
    .then(resp => {
      Object.keys(resp.data).length.should.equal(2)
      done()
    })
    .catch(err => {
      err.should.not.exist
      done()
    })
  })

  it('properties of predictNewSaving response should not null', done => {
    axios.get('/alexa/predictNewSaving', houseToPredict)
    .then(resp => {
      resp.data.new_time.should.not.equal(null)
      resp.data.new_saving.should.not.equal(null)
      done()
    })
    .catch(err => {
      err.should.not.exist
      done()
    })
  })

  it('new_time should not same as time. new_time !== current_time', done => {
    axios.get('/alexa/predictNewSaving', houseToPredict)
    .then(resp => {
      let current_time = houseToPredict.params.time_period
      let status = resp.data.new_time != current_time
      status.should.equal(true)
      done()
    })
    .catch(err => {
      err.should.not.exist
      done()
    })
  })

  it('new_saving should not same as current_saving', done => {
    axios.get('/alexa/predictNewSaving', houseToPredict)
    .then(resp => {
      let current_saving = houseToPredict.params.current_saving
      let status = resp.data.new_saving != current_saving
      status.should.equal(true)
      done()
    })
    .catch(err => {
      err.should.not.exist
      done()
    })
  })
})
