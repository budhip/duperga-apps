
var chai = require('chai')
var axios = require('./axios_config')
var should = chai.should()

var userLogin = {
  email: 'fajar@gmail.com',
  password: 'fajar'
}

describe('POST /wishlist', () => {

  it(`Response should a token`, (done) => {
    axios.post(`/users/login`, userLogin)
    .then(({ data }) => {
      data.should.have.property('token')
      done()
    })
    .catch(err => {
      err.response.data.status.should.not.equal(404)
      done()
    })
  })

})
