var chai = require('chai')
var axios = require('./axios_config')

var should = chai.should()


describe('POST /register', () => {
  var newUser = {
    name: 'fajar',
    email: 'fajar@gmail.com',
    password: 'fajar'
  }

  after((done) => {
    axios.delete('/users/clear')
    .then(resp => {
      console.log(`clear all user`)
      done()
    })
    .catch(err => {
      done()
    })
  })

  it(`Should create a user with name 'fajar'`, (done) => {
    axios.post(`/users/register`, newUser)
    .then( resp => {
      resp.data.name.should.equal('fajar')
      done()
    })
    .catch(err => {
      console.log('masuk erro')
      err.response.data.status.should.not.equal(404)
      done()
    })
  })

  it(`Response should 'give error code 11000' or user already registered`, (done) => {
    axios.post(`/users/register`, newUser)
    .then(resp => {
      done()
    })
    .catch(err => {
      err.response.data.code.should.equal(11000)      
      done()
    })
  })

  it(`response status should '404'`, (done) => {
    axios.post(`/users/blabla`, newUser)
    .then(({data}) => {
      done()
    })
    .catch(err => {
      err.response.data.status.should.equal(404)
      done()
    })
  })

})

module.exports = axios;
