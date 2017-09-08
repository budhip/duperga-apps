
var chai = require('chai')
var axios = require('./axios_config')
var should = chai.should()

describe('PUT /wishlist/:wishlistID', () => {
  var wishlistID
  var token

  var newWishlist = {
    name: 'Honda Mobilio',
    budget: 50000000,
    alexa_advice: 'save 20000000 per month',
    category: 'Car'
  }

  // login first
  before(done => {
    axios.post(`/login`, userLogin)
    .then((resp) => {
      token = resp.data.token
      done()
    })
    .catch(err => {
      err.response.data.status.should.not.equal(404)
      done()
    })
  })

  // create wishlist
  before(done => {
    axios.post('/wishlist', newWishlist)
    .then((resp) => {
      wishlistID = resp.data._id
      done()
    })
    .catch(err => {
      err.response.data.status.should.not.equal(404)
      done()
    })
  })

  // clear all wishlist
  after(done => {
    axios.delete('/wishlist/clear')
    .then(resp => {
      console.log(resp.data)
      done()
    })
    .catch(err => {
      err.response.data.status.should.not.equal(404)
      done()
    })
  })

  it(`response should be an object`, (done) => {
    axios.put(`/wishlist/`, {
      budget: 1
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

  it(`name response should change to 'honda jazz'`, (done) => {
    axios.put(`/wishlist/${wishlistID}`, {
      name: 'honda jazz'
    }, {
      headers: {
        token: token
      }
    })
    .then((resp) => {
      resp.data.name.should.equal('honda jazz')
      done()
    })
    .catch(err => {
      err.response.data.status.should.not.equal(404)
      done()
    })
  })

  it(`name response should not change to 'honda jazz'`, (done) => {
    axios.put(`/wishlist/${wishlistID}`, {
      names: 'honda vario'
    }, {
      headers: {
        token: token
      }
    })
    .then((resp) => {
      resp.data.name.should.not.equal('honda vario')
      done()
    })
    .catch(err => {
      err.response.data.status.should.not.equal(404)
      done()
    })
  })

  it(`response have status 404 because it's don't have right end point`, (done) => {
    axios.put(`/wishlis/${wishlistID}`, {
      name: 'honda vario'
    }, {
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

  it(`response should return 'you are not authorized' when update because of wrong token`, done => {
    axios.put(`/wishlist/${wishlistID}`, {
      name: 'honda vario'
    }, {
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
      err.response.data.message.should.equal('you are not authorized')
      done()
    })
  })

  it(`response should return 'you must login first' when update because token was not exist`, done => {
    axios.put(`/wishlist/${wishlistID}`, {
      name: 'honda vario'
    })
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
