
var chai = require('chai')
var axios = require('./axios_config')
var should = chai.should()


describe('GET /wishlist', () => {
  let token
  let userID
  // let userLogin = {
  //   email: 'fajar@gmail.com',
  //   password: 'fajar'
  // }

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

  before(done => {
    axios.post('/wishlist/seed')
    .then((resp) => {
      done()
    })
    .catch(err => {
      err.response.data.status.should.not.equal(404)
      done()
    })
  })

  after(done => {
    axios.delete(`/wishlist/clear`)
    .then(resp => {
      console.log(`deleted`)
      done()
    })
    .catch(err => {
      console.log('error')
      done()
    })
  })

  it(`should have 2 wishlist`, (done) => {
    axios.get(`/wishlist`)
    .then((resp) => {
      resp.data.length.should.equal(2)
      done()
    })
    .catch(err => {
      err.response.data.status.should.not.equal(404)
      done()
    })
  })

  it(`should not more than 2 wishlist`, (done) => {
    axios.get(`/wishlist`)
    .then((resp) => {
      resp.data.length.should.not.equal(4)
      done()
    })
    .catch(err => {
      err.response.data.status.should.not.equal(404)
      done()
    })
  })

  it(`second data name should be 'Rumah di Pakubuwono'`, (done) => {
    axios.get(`/wishlist`)
    .then((resp) => {
      resp.data[1].name.should.equal('Rumah di Pakubuwono')
      done()
    })
    .catch(err => {
      err.response.data.status.should.not.equal(404)
      done()
    })
  })

  it(`first data name should equal to 'Honda Jazz'`, (done) => {
    axios.get(`/wishlist`)
    .then((resp) => {
      resp.data[0].name.should.equal('Honda Jazz')
      done()
    })
    .catch(err => {
      err.response.data.status.should.not.equal(404)
      done()
    })
  })

  it(`Should get response 404`, (done) => {
    axios.get('/wish')
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


describe('GET /wishlist/:wishlistID', () => {

  let wishlistID
  let token
  let userID
  let userLogin = {
    email: 'fajar@gmail.com',
    password: 'fajar'
  }

  let newWishlist = {
    name: 'Rumah di Pakubuwono',
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

  before(done => {
    axios.post(`/wishlist`, newWishlist)
    .then(created => {
      wishlistID = created.data._id
      done()
    })
    .catch(err => {
      done()
    })
  })

  after(done => {
    axios.delete(`/wishlist/clear`)
    .then(resp => {
      console.log(`deleted`)
      done()
    })
    .catch(err => {
      console.log('error')
      done()
    })
  })

  it(`Should be an object and have _id property`, done => {
    console.log(wishlistID)
    axios.get(`/wishlist/${wishlistID}`)
    .then(resp => {
      resp.data.should.have.property('_id')
      resp.data.should.be.an('object')
      done()
    })
    .catch(err => {
      err.should.not.exist
      done()
    })
  })

  it(`Should not an array`, done => {
    axios.get(`/wishlist/${wishlistID}`)
    .then(resp => {
      resp.data.should.not.be.an('array')
      done()
    })
    .catch(err => {
      err.should.not.exist
      done()
    })
  })

  it(`Should not an array`, done => {
    axios.get(`/wishlist/${wishlistID}`)
    .then(resp => {
      resp.data.should.not.be.an('array')
      done()
    })
    .catch(err => {
      err.should.not.exist
      done()
    })
  })
})
