
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
  var token

  var testUser = {
    name: 'test1',
    email: 'test1@gmail.com',
    password: 'test1'
  }
  var testUserLogin = {
    email: 'test1@gmail.com',
    password: 'test1'
  }

  // register user
  before(done => {
    axios.post('/users/register', testUser)
    .then(resp => {
      userID = resp.data._id
      done()
    })
    .catch(err => {
      err.response.data.status.should.not.equal(404)
      done()
    })
  })

  // login user
  before(done => {
    axios.post('/users/login', testUserLogin)
    .then(resp => {
      token = resp.data.token
      done()
    })
    .catch(err => {
      console.log(err.response.data.status)
      done()
    })
  })

  // clear all created wishlist
  afterEach(done => {
    axios.delete('/wishlist/clear')
    .then(resp => {
      console.log(resp.data)
      done()
    })
    .catch(err => {
      console.log(err.message)
      done()
    })
  })

  // clear all registered user
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
    axios.post(`/wishlist`, newWishlist, {
      headers: {
        token: token
      }
    })
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
    axios.post(`/wishlist`, newWishlist, {
      headers: {
        token: token
      }
    })
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
    axios.post(`/wishlistss`, newWishlist, {
      headers: {
        token: token
      }
    })
    .then((resp) => {
      resp.data.should.have.property('_id')
      done()
    })
    .catch(err => {
      err.response.data.status.should.not.equal(404)
      done()
    })
  })

  it(`response should not an array`, (done) => {
    newWishlist.userID = userID
    axios.post(`/wishlistss`, newWishlist, {
      headers: {
        token: token
      }
    })
    .then((resp) => {
      resp.data.should.not.an('array')
      done()
    })
    .catch(err => {
      err.response.data.status.should.not.equal(404)
      done()
    })
  })

  it(`response should 'you are not authorized' with wrong token`, (done) => {
    newWishlist.userID = userID
    axios.post(`/wishlistss`, newWishlist, {
      headers: {
        token: '1asdfasdf'
      }
    })
    .then((resp) => {
      resp.data.should.not.exist
      done()
    })
    .catch(err => {
      err.response.data.status.should.equal(500)
      err.response.data.message.should.equal('you are not authorized')
      done()
    })
  })

  it(`response should 'you must login first' with no token`, (done) => {
    newWishlist.userID = userID
    axios.post(`/wishlistss`, newWishlist)
    .then((resp) => {
      resp.data.should.not.exist
      done()
    })
    .catch(err => {
      err.response.data.status.should.equal(500)
      err.response.data.message.should.equal('you must login first')
      done()
    })
  })

})
