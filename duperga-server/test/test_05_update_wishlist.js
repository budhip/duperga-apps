
var chai = require('chai')
var axios = require('./axios_config')
var should = chai.should()

describe('PUT /wishlist/:wishlistID', () => {
  var wishlistID
  var token

  var newWishlist = {
    name: 'Rumah di Dago',
    time_period: 5,
    current_price: 1000000000,
    current_saving: 10000000,
    predicted_budget: [
      {
        month: 'September',
        price: 10020000
      },
      {
        month: 'October',
        price: 10400000
      },
      {
        month: 'November',
        price: 10600000
      },
      {
        month: 'December',
        price: 11000000
      },
      {
        month: 'January',
        price: 15000000
      }
    ],
    predicted_price: [
      {
        month: 'September',
        price: 1060000000
      },
      {
        month: 'October',
        price: 1080000000
      },
      {
        month: 'November',
        price: 1090000000
      },
      {
        month: 'December',
        price: 1100000000
      },
      {
        month: 'January',
        price: 1200000000
      }
    ]
  }


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
      done()
    })
    .catch(err => {
      err.response.data.status.should.not.equal(404)
      done()
    })
  })

  it(`response should be an object`, (done) => {
    axios.put(`/wishlist/${wishlistID}`, {
      current_saving: 1
    })
    .then((resp) => {
      resp.data.should.be.an('object')
      done()
    })
    .catch(err => {
      err.should.not.exist
      done()
    })
  })

  it(`name response should change to 'honda jazz'`, (done) => {
    axios.put(`/wishlist/${wishlistID}`, {
      name: 'honda jazz'
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
      name: 'honda vario'
    })
    .then((resp) => {
      resp.data.name.should.not.equal('honda jazz')
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

  it(`response should return 500, because of wrong wishlist id`, done => {
    axios.put(`/wishlist/11111`, {
      name: 'tes'
    })
    .then((resp) => {
      resp.data.should.not.exist
      done()
    })
    .catch(err => {
      err.response.status.should.equal(500)
      done()
    })
  })

})
