var chai = require('chai')
var axios = require('axios')

var should = chai.should()
axios.defaults.baseURL = 'http://localhost:3000/api'

describe('GET /', () => {
  it(`Should response 'pong' !`, (done) => {
    axios.get(`/`)
    .then(({ data }) => {
      data.should.equal('pong!')
      done()
    })
  })

  it(`Should not response 'routes not found' !`, (done) => {
    axios.get(`/`)
    .then(({ data }) => {
      data.should.not.equal('routes not found')
      done()
    })
  })

})

describe('POST /register', () => {

  after((done) => {
    axios.delete('/users/clear')
  })

  it(`Response should be an object`, (done) => {
    axios.post(`/users/register`, {
      email: 'fajar@gmail.com',
      password: 'fajar'
    })
    .then(({ data }) => {
      data.should.be.an('object')
      done()
    })
  })

  it(`Response should property username`, (done) => {
    axios.post(`/users/register`, {
      email: 'fajar@gmail.com',
      password: 'fajar'
    })
    .then(({ data }) => {
      data.should.have.property('username')
      done()
    })
    .
  })
})
