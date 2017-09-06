
var chai = require('chai')
var axios = require('./axios_config')
var should = chai.should()

var newWishlist = {
  name: 'Honda Mobilio',
  budget: 50000000,
  alexa_advice: 'save 20000000 per month',
  category: 'Car'
}

describe('POST /wishlist', () => {

  var userID

  before(done => {
    axios.post('/users')
    .then(resp => {
      userID = resp.data._id
      done()
    })
    .catch(err => {
      err.response.data.status.should.not.equal(404)
      done()
    })
  })

  after(done => {
    axios.delete('/users/clear')
    .then(resp => {
      console.log(resp)
      done()
    })
    .catch(err => {
      console.log(err)
      done()
    })
  })

  it(`response should be an object`, (done) => {
    newWishlist.userID = userID
    axios.post(`/wishlist`, newWishlist)
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
    newWishlist.userID = userID
    axios.post(`/wishlist`, newWishlist)
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
    newWishlist.userID = userID
    axios.post(`/wishlistss`, newWishlist)
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
    newWishlist.userID = userID
    axios.post(`/wishlistss`, newWishlist)
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
