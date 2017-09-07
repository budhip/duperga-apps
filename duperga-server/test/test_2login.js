
var chai = require('chai')
var axios = require('./axios_config')
var should = chai.should()


describe('POST /users/login', () => {
  var userLogin = {
    email: 'fajar@gmail.com',
    password: 'fajar'
  }

  var falseLogin = {
    email: 'budi@gmail.com',
    password: 'budi'
  }

  it(`Response should a token`, (done) => {
    axios.post(`/login`, userLogin)
    .then((resp) => {
      resp.data.should.have.property('token')
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

  it(`Should response 'user not registered'`, done => {
    axios.post(`/users/login`, falseLogin)
    .then(resp => {
      resp.data.should.equal('user not registered')
      done()
    })
    .catch(err => {
      err.should.not.exist
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
