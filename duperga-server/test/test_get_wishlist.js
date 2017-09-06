
var chai = require('chai')
var axios = require('./axios_config')
var should = chai.should()


describe('GET /wishlist', () => {

  var wishlistID
  var token
  var userID
  var userLogin = {
    email: 'fajar@gmail.com',
    password: 'fajar'
  }

  var tokenHeader = {
    headers: {
      token: token
    }
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

  before(done => {
    axios.post('/wishlist/seed', newWishlist , tokenHeader)
    .then((resp) => {
      wishlistID = resp.data._id
      done()
    })
    .catch(err => {
      err.response.data.status.should.not.equal(404)
      done()
    })
  })

  after(done => {
    axios.delete(`/users/${userID}`)
    .then(resp => {
      console.log(`deleted`)
      done()
    })
    .catch(err => {
      console.log('error')
      done()
    })
  })

  describe(`GET /wishlist`, () => {
    it(`should have 5 wishlist`, (done) => {
      axios.get(`/wishlist`)
      .then((resp) => {
        resp.data.length.should.equal(5)
        done()
      })
      .catch(err => {
        err.response.data.status.should.not.equal(404)
        done()
      })
    })

    it(`should not more than 5 wishlist`, (done) => {
      axios.get(`/wishlist`)
      .then((resp) => {
        resp.data.length.should.not.equal(7)
        done()
      })
      .catch(err => {
        err.response.data.status.should.not.equal(404)
        done()
      })
    })

    it(`second data should have property 'userID'`, (done) => {
      axios.get(`/wishlist`)
      .then((resp) => {
        resp.data[0].name.should.have.property('userID')
        done()
      })
      .catch(err => {
        err.response.data.status.should.not.equal(404)
        done()
      })
    })

    it(`first data name should equal to 'Toyota avanza'`, (done) => {
      axios.get(`/wishlist`)
      .then((resp) => {
        resp.data[0].toLowerCase().should.equal('toyota avanza')
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
      })
      .catch(err => {
        err.response.data.status.should.equal(404)
      })
    })

  })

})

describe('GET /wishlist/:userID', () => {
  var wishlistID
  var token
  var userID
  var userLogin = {
    email: 'fajar@gmail.com',
    password: 'fajar'
  }

  var tokenHeader = {
    headers: {
      token: token
    }
  }

  var tensor = {
    data: data
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

  after(done => {
    axios.delete(`/users/${userID}`)
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
    axios.get(`/wishlist/${wishlistID}`, tensor, tokenHeader)
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
    axios.get(`/wishlist/${wishlistID}`, tensor, tokenHeader)
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
    axios.get(`/wishlist/${wishlistID}`, tensor, tokenHeader)
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
