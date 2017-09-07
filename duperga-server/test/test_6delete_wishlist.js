
var chai = require('chai')
var axios = require('./axios_config')
var should = chai.should()


describe('DELETE /wishlist/:wishlistID', () => {
  var userID
  var wishlistID
  var token

  var newWishlist = {
    name: 'Honda Mobilio',
    budget: 50000000,
    alexa_advice: 'save 20000000 per month',
    category: 'Car'
  }

  before(done => {
    axios.post('/register', {
      email: `testing@gmail.com`,
      password: `testing`
    })
    .then(resp => {
      userID = resp.data._id
      done()
    })
    .catch(err => {
      err.should.not.exist
      done()
    })
  })

  before(done => {
    axios.post('/login', {
      email: `testing@gmail.com`,
      password: `testing`
    })
    .then(resp => {
      token = resp.data.token
      done()
    })
    .catch(err => {
      err.should.not.exist
      done()
    })
  })

  beforeEach(done => {
    newWishlist.userID = userID
    axios.post('/wishlist', newWishlist , tokenHeader)
    .then((resp) => {
      wishlistID = resp.data._id
      done()
    })
    .catch(err => {
      err.response.data.status.should.not.equal(404)
      done()
    })
  })

  after (done => {
    axios.delete(`/users/${userID}`)
    .then(resp => {
      console.log(resp.data)
      done()
    })
    .catch(err => {
      done()
    })
  })

  it(`wishlist deleted id should ${wishlistID}`, (done) => {
    axios.delete(`/wishlist/${wishlistID}`, {
      headers: {
        token: token
      }
    })
    .then((resp) => {
      resp.data._id.should.equal(wishlistID)
      done()
    })
    .catch(err => {
      err.response.data.status.should.not.equal(404)
      done()
    })
  })

  it(`wishlist deleted id should not 123`, (done) => {
    axios.delete(`/wishlist/${wishlistID}`, {
      headers: {
        token: token
      }
    })
    .then((resp) => {
      resp.data.id.should.not.equal(123)
      done()
    })
    .catch(err => {
      err.response.data.status.should.not.equal(404)
      done()
    })
  })

  it(`Should give status 500`, (done) => {
    axios.delete(`/wishlist/wrongID`, {
      headers: {
        token: token
      }
    })
    .then((resp) => {
      resp.data.should.not.exist
      done()
    })
    .catch(err => {
      err.response.data.status.should.equal(500)
      done()
    })
  })

  it(`Should give status 404`, (done) => {
    axios.delete(`/wishlist/${wishlistID}`, {
      headers: {
        token: token
      }
    })
    .then((resp) => {
      resp.data.should.not.exist
      done()
    })
    .catch(err => {
      err.response.data.status.should.equal(404)
      done()
    })
  })

  it(`response data should have complete property`, (done) => {
    axios.delete(`/wishlist/${wishlistID}`, {
      headers: {
        token: token
      }
    })
    .then((resp) => {
      resp.data.should.have.property('name')
      resp.data.should.have.property('budget')
      resp.data.should.have.property('current_price')
      resp.data.should.have.property('predict_price')
      done()
    })
    .catch(err => {
      err.response.data.status.should.not.equal(404)
      done()
    })
  })

})
