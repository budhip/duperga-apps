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
      console.log(resp)
    })
    .catch(err => {
      console.log(err)
    })
  })

  it(`Should create a user with name 'fajar'`, (done) => {
    axios.post(`/users/register`, newUser)
    .then( resp => {
      console.log(data)
      resp.data.name.should.equal('fajar')
      done()
    })
    .catch(err => {
      err.response.data.status.should.not.equal(404)
      done()
    })
  })

  it(`Response should 'user registered'`, (done) => {
    axios.post(`/users/register`, newUser)
    .then(resp => {
      resp.data.should.equal('user registered')
      done()
    })
    .catch(err => {
      err.response.data.status.should.not.equal(404)
      done()
    })
  })

  it(`response status should '404'`, (done) => {
    axios.post(`/users/blabla`, newUser)
    .then(({data}) => {
      console.log(data)
    })
    .catch(err => {
      err.response.data.status.should.equal(404)
      done()
    })
  })  

})

module.exports = axios;
