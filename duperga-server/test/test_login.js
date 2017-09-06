
var chai = require('chai')
var axios = require('./axios_config')
var should = chai.should()

var userLogin = {
  email: 'fajar@gmail.com',
  password: 'fajar'
}

describe('POST /users/login', () => {

  it(`Response should a token`, (done) => {
    axios.post(`/login`, userLogin)
    .then(({ data }) => {
      data.should.have.property('token')
      done()
    })
    .catch(err => {
      err.response.data.status.should.not.equal(404)
      done()
    })
  })

  it(`Response should not empty`, (done) => {
    axios.post(`/users/login`, userLogin)
    .then(({ data }) => {
      data.should.not.equal(null)
      done()
    })
    .catch(err => {
      err.response.data.status.should.not.equal(404)
      done()
    })
  })

  it(`Response should have status 404`, (done) => {
    axios.post(`/users/loginsss`)
    .then(({ data }) => {
      data.should.equal(null)
      done()
    })
    .catch(err => {
      err.response.data.status.should.equal(404)
      done()
    })
  })

})
