
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

  // login first
  // before(done => {
  //   axios.post(`/login`, userLogin)
  //   .then((resp) => {
  //     token = resp.data.token
  //     done()
  //   })
  //   .catch(err => {
  //     err.response.data.status.should.not.equal(404)
  //     done()
  //   })
  // })

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

  it(`response should return 500`, done => {
    axios.put(`/wishlist/${wishlistID}`, {
      namee: 'honda vario'
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

  // it(`response should return 'you are not authorized' when update because of wrong token`, done => {
  //   axios.put(`/wishlist/${wishlistID}`, {
  //     name: 'honda vario'
  //   })
  //   .then((resp) => {
  //     resp.data.should.not.exist
  //     done()
  //   })
  //   .catch(err => {
  //     err.response.data.status.should.equal(500)
  //     err.response.data.message.should.equal('you are not authorized')
  //     done()
  //   })
  // })

})
