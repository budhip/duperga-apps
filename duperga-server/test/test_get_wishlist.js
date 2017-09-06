
var chai = require('chai')
var axios = require('./axios_config')
var should = chai.should()

var userLogin = {
  email: 'fajar@gmail.com',
  password: 'fajar'
}

describe('GET /', () => {

  it(`response pong!`, (done) => {
    axios.get(`/`)
    .then(({ data }) => {
      data.should.equal('pong!')
      done()
    })
    .catch(err => {
      err.status.should.equal(404)
    })
  })
})
