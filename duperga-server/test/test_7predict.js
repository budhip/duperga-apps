
var chai = require('chai')
var should = chai.should()
var axios = require('./axios_config')

describe(`POST /predictions > TensorFlow endPoint`, () => {

  let newWishlist = {
    name: 'Rumah di Pakubuwono',
    time_period: 5,
    current_price: 1000000000,
    current_saving: 10000000
  }

  let falseWishlist = {
    name: 'Rumah di Pakubuwono',
    time_period: 'lima',
    current_price: 1000000000,
    current_saving: 10000000
  }

  // clear all wishlist
  afterEach(done => {
    axios.delete('/wishlist/clear')
    .then(resp => {
      done()
    })
    .catch(err => {
      done()
    })
  })

  it('property predicted_budget should an array', done => {
    axios.post('/predictions', newWishlist)
    .then(resp => {
      resp.data.predicted_budget.should.an('array')
      done()
    })
    .catch(err => {
      err.should.not.exist
      done()
    })
  })

  it('property predicted_price should not array', done => {
    axios.post('/predictions', newWishlist)
    .then(resp => {
      resp.data.predicted_budget.should.an('array')
      done()
    })
    .catch(err => {
      err.should.not.exist
      done()
    })
  })

  it('property predicted_price should not null', done => {
    axios.post('/predictions', newWishlist)
    .then(resp => {
      resp.data.predicted_price.should.not.equal(null)
      done()
    })
    .catch(err => {
      err.should.not.exist
      done()
    })
  })

  it('response should return status 404 because its not a right end point', done => {
    axios.post('/predict', newWishlist)
    .then(resp => {
      resp.data.should.not.exist
      done()
    })
    .catch(err => {
      err.response.data.status.should.equal(404)
      done()
    })
  })

  it('response should return status 404 because time_period is not a number', done => {
    axios.post('/predict', falseWishlist)
    .then(resp => {
      resp.data.should.not.exist
      done()
    })
    .catch(err => {
      err.response.data.status.should.equal(404)
      done()
    })
  })

})
