
var chai = require('chai')
var should = chai.should()

describe(`POST /learning`, () => {
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

  var tensorData = {
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

  it(`Should be an object`, done => {
    axios.post(`/learning`, tensorData, tokenHeader)
    .then(resp => {
      resp.data.should.be.an('object')
      done()
    })
    .catch(err => {
      err.should.not.exist
      done()
    })
  })

  it(`Should not an array`, done => {
    axios.post(`/learning`, tensorData, tokenHeader)
    .then(resp => {
      resp.data.should.not.be.an('array')
      done()
    })
    .catch(err => {
      err.should.not.exist
      done()
    })
  })

  it(`Should return response status 404`, done => {
    axios.post(`/learningsss`, tensorData, tokenHeader)
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
