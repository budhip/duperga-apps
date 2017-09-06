var chai = require('chai')
var axios = require('./axios_config')

var should = chai.should()

var newUser = {
  email: 'fajar@gmail.com',
  password: 'fajar'
}

describe('POST /register', () => {

  // afterEach((done) => {
  //   axios.delete('/users/clear')
  //   .then(resp => {
  //     console.log(resp)
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
  // })

  it(`Should create a user`, (done) => {
    axios.post(`/users/register`, newUser)
    .then(({ data }) => {
      console.log(data)
      data.should.equal('user has been created')
      done()
    })
    .catch(err => {
      err.response.data.status.should.not.equal(404)
      done()
    })
  })

  it(`Response should not 'user registered'`, (done) => {
    axios.post(`/users/register`, newUser)
    .then(({ data }) => {
      data.should.not.equal('user registered')
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
