
var chai = require('chai')
var axios = require('./axios_config')
var should = chai.should()


describe('DELETE /wishlist/:wishlistID', () => {
  var userID
  var wishlistID
  var token

  var newWishlist = {
    name: 'Rumah di Lembang',
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

  // before(done => {
  //   axios.post('/register', {
  //     email: `testing@gmail.com`,
  //     password: `testing`
  //   })
  //   .then(resp => {
  //     userID = resp.data._id
  //     done()
  //   })
  //   .catch(err => {
  //     err.should.not.exist
  //     done()
  //   })
  // })
  //
  // before(done => {
  //   axios.post('/login', {
  //     email: `testing@gmail.com`,
  //     password: `testing`
  //   })
  //   .then(resp => {
  //     token = resp.data.token
  //     done()
  //   })
  //   .catch(err => {
  //     err.should.not.exist
  //     done()
  //   })
  // })

  beforeEach(done => {
    newWishlist.userID = userID
    axios.post('/wishlist', newWishlist)
    .then((resp) => {
      wishlistID = resp.data._id
      done()
    })
    .catch(err => {
      console.log(`masuk error`)
      err.response.data.status.should.not.equal(404)
      done()
    })
  })

  // after (done => {
  //   axios.delete(`/users/${userID}`)
  //   .then(resp => {
  //     console.log(`deleted`)
  //     done()
  //   })
  //   .catch(err => {
  //     done()
  //   })
  // })

  it(`wishlist deleted one data`, (done) => {
    axios.delete(`/wishlist/${wishlistID}`)
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
    axios.delete(`/wishlist/${wishlistID}`)
    .then((resp) => {
      resp.data._id.should.not.equal(123)
      done()
    })
    .catch(err => {
      err.response.data.status.should.not.equal(404)
      done()
    })
  })

  it(`Should give status 500`, (done) => {
    axios.delete(`/wishlist/wrongID`)
    .then((resp) => {
      resp.data.should.not.exist
      done()
    })
    .catch(err => {
      err.response.status.should.equal(500)
      done()
    })
  })

  it(`Should give status 404`, (done) => {
    axios.delete(`/wishlists/${wishlistID}`)
    .then((resp) => {
      resp.data.should.not.exist
      done()
    })
    .catch(err => {
      err.response.data.status.should.equal(404)
      done()
    })
  })

  it(`response data should have all properties`, (done) => {
    axios.delete(`/wishlist/${wishlistID}`)
    .then((resp) => {
      resp.data.should.have.property('name')
      resp.data.should.have.property('current_saving')
      resp.data.should.have.property('current_price')
      resp.data.should.have.property('predicted_price')
      done()
    })
    .catch(err => {
      err.response.data.status.should.not.equal(404)
      done()
    })
  })

})
