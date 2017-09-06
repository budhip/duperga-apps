
var chai = require('chai')
var axios = require('./axios_config')
var should = chai.should()

var wishlistData = {
  name: 'Toyota Camry',
  budget: 100000000,
  budget_planning: '5000000 per month',
  current_price: 300000000,
  predicted_price: 250000000,
  userID: 1
}

describe('POST /wishlist', () => {

  it(`response should be an object`, (done) => {
    axios.post(`/wishlist`, wishlistData)
    .then((resp) => {
      resp.data.should.be.an('object')
      done()
    })
    .catch(err => {
      err.response.data.status.should.not.equal(404)
      done()
    })
  })

  it(`response should have property _id`, (done) => {
    axios.post(`/wishlist`, wishlistData)
    .then((resp) => {
      resp.data.should.have.property('_id')
      done()
    })
    .catch(err => {
      err.response.data.status.should.not.equal(404)
      done()
    })
  })

  it(`response should have status 404`, (done) => {
    axios.post(`/wishlistss`, wishlistData)
    .then((resp) => {
      resp.data.should.have.property('_id')
      done()
    })
    .catch(err => {
      err.response.data.status.should.equal(404)
      done()
    })
  })

  it(`response should not an array`, (done) => {
    axios.post(`/wishlistss`, wishlistData)
    .then((resp) => {
      resp.data.should.not.an('array')
      done()
    })
    .catch(err => {
      err.response.data.status.should.equal(404)
      done()
    })
  })

})
