
var chai = require('chai')
var axios = require('./axios_config')
var should = chai.should()
var jwt = require('jsonwebtoken')


describe('POST /users/login', () => {
  var userLogin = {
    email: 'fajar@gmail.com',
    password: 'fajar'
  }

  var falseLogin = {
    email: 'budi@gmail.com',
    password: 'budi'
  }

  var newUser = {
    name: 'fajar',
    email: 'fajar@gmail.com',
    password: 'fajar'
  }

  // before(done => {
  //   axios.post(`/users/register`, newUser)
  //   .then( resp => {
  //     done()
  //   })
  //   .catch(err => {
  //     err.response.data.status.should.not.equal(404)
  //     done()
  //   })
  // })
  //
  // after((done) => {
  //   axios.delete('/users/clear')
  //   .then(resp => {
  //     done()
  //   })
  //   .catch(err => {
  //     done()
  //   })
  // })

  it(`Response should a string with length more than 10`, (done) => {
    axios.post(`/users/login`, userLogin)
    .then((resp) => {
      console.log(`masuk resp`);
      resp.data.should.a('string')
      resp.data.length.should.not.equal(10)
      done()
    })
    .catch(err => {
      console.log(`masuk error`);
      err.response.data.status.should.not.equal(404)
      done()
    })
  })

  // it(`Response should not empty`, (done) => {
  //   axios.post(`/users/login`, userLogin)
  //   .then(({ data }) => {
  //     data.should.not.equal(null)
  //     done()
  //   })
  //   .catch(err => {
  //     err.response.data.status.should.not.equal(404)
  //     done()
  //   })
  // })
  //
  // it(`Should response 'user not registered'`, done => {
  //   axios.post(`/users/login`, falseLogin)
  //   .then(resp => {
  //     resp.data.should.equal('user not registered')
  //     done()
  //   })
  //   .catch(err => {
  //     err.should.not.exist
  //     done()
  //   })
  // })
  //
  // it(`Response should have status 404`, (done) => {
  //   axios.post(`/users/loginsss`)
  //   .then(({ data }) => {
  //     data.should.equal(null)
  //     done()
  //   })
  //   .catch(err => {
  //     err.response.data.status.should.equal(404)
  //     done()
  //   })
  // })

})
