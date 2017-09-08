
var chai = require('chai')
var axios = require('./axios_config')
var should = chai.should()

var newWishlist = {
  name: 'Honda Jazz',
  time_period: 4,
  current_price: 160000000,
  current_saving: 2000000,
  predicted_budget: [
    {
      month: 'September',
      price: 2200000
    },
    {
      month: 'October',
      price: 4600000
    },
    {
      month: 'November',
      price: 8000000
    },
    {
      month: 'December',
      price: 1100000
    }
  ],
  predicted_price: [
    {
      month: 'September',
      price: 160500000
    },
    {
      month: 'October',
      price: 161000000
    },
    {
      month: 'November',
      price: 165000000
    },
    {
      month: 'December',
      price: 167000000
    }
  ]
}

var wrongWishlist = {
  time_period: 4,
  current_price: 160000000,
  current_saving: 2000000,
  predicted_budget: [
    {
      month: 'September',
      price: 2200000
    },
    {
      month: 'October',
      price: 4600000
    },
    {
      month: 'November',
      price: 8000000
    },
    {
      month: 'December',
      price: 1100000
    }
  ],
  predicted_price: [
    {
      month: 'September',
      price: 160500000
    },
    {
      month: 'October',
      price: 161000000
    },
    {
      month: 'November',
      price: 165000000
    },
    {
      month: 'December',
      price: 167000000
    }
  ]
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
  // before(done => {
  //   axios.post('/users/register', testUser)
  //   .then(resp => {
  //     userID = resp.data._id
  //     done()
  //   })
  //   .catch(err => {
  //     err.response.data.status.should.not.equal(404)
  //     done()
  //   })
  // })

  // login user
  // before(done => {
  //   axios.post('/users/login', testUserLogin)
  //   .then(resp => {
  //     token = resp.data.token
  //     done()
  //   })
  //   .catch(err => {
  //     console.log(err.response.data.status)
  //     done()
  //   })
  // })

  // clear all created wishlist
  // afterEach(done => {
  //   axios.delete('/wishlist/clear')
  //   .then(resp => {
  //     console.log(resp.data)
  //     done()
  //   })
  //   .catch(err => {
  //     console.log(err.message)
  //     done()
  //   })
  // })

  // clear all registered user
  after(done => {
    axios.delete('/wishlist/clear')
    .then(resp => {
      console.log(`clear all wishlist`)
      done()
    })
    .catch(err => {
      done()
    })
  })

  it(`response should be an object`, (done) => {
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
    // newWishlist.userID = userID
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
    // newWishlist.userID = userID
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
    // newWishlist.userID = userID
    axios.post(`/wishlist`, newWishlist)
    .then((resp) => {
      resp.data.should.not.an('array')
      done()
    })
    .catch(err => {
      err.response.data.status.should.not.equal(404)
      done()
    })
  })

  it(`response data should have property predict_price`, (done) => {
    // newWishlist.userID = userID
    axios.post(`/wishlist`, newWishlist)
    .then((resp) => {
      resp.data.should.have.property('predicted_price')
      done()
    })
    .catch(err => {
      err.should.not.exist
      done()
    })
  })

  it(`current_price should be a number`, (done) => {
    // newWishlist.userID = userID
    axios.post(`/wishlist`, newWishlist)
    .then((resp) => {      
      resp.data.current_price.should.be.an('number')
      done()
    })
    .catch(err => {
      err.should.not.exist
      done()
    })
  })

  it(`response data should have status 500 because it has no name property`, (done) => {
    // newWishlist.userID = userID
    axios.post(`/wishlist`, wrongWishlist)
    .then((resp) => {
      resp.data.should.not.exist
      done()
    })
    .catch(err => {
      err.response.status.should.equal(500)
      done()
    })
  })

  // it(`response should 'you must login first' with no token`, (done) => {
  //   newWishlist.userID = userID
  //   axios.post(`/wishlistss`, newWishlist)
  //   .then((resp) => {
  //     resp.data.should.not.exist
  //     done()
  //   })
  //   .catch(err => {
  //     err.response.data.status.should.equal(500)
  //     err.response.data.message.should.equal('you must login first')
  //     done()
  //   })
  // })

})
