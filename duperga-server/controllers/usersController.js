
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')

var User = require('../models/user')

var getAll = (req, res) => {
  User.find({})
  .then(users => {
    res.send(users)
  })
  .catch(err => {
    res.status(500).send(err.message)
  })
}

var register = (req, res) => {

  const saltRounds = 10;
  let salt = bcrypt.genSaltSync(saltRounds)
  let hash = bcrypt.hashSync(req.body.password, salt)
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash
  })

  newUser.save()
  .then(created => {
    res.send(created)
  })
  .catch(err => {
    res.status(500).send(err)
    console.log('err code', err.code)
  })
}

var login = (req, res) => {
  User.findOne({email: req.body.email})
  .then(found => {
    let decoded = bcrypt.compareSync(req.body.password, found.password)
    if (decoded) {
      var token = jwt.sign({
        id: decoded.id,
        email: decoded.email
      }, process.env.SECRET_KEY, { expiresIn: '6h'})
      res.send(token)
    } else {
      console.log(`password not match`)
    }
  })
  .catch(err => {
    console.log(`masukk error`)
    console.log(err.response)
    res.status(500).send('user not registered')
  })
}

var clear = (req, res) => {
  User.remove({})
  .then(removed => {
    res.send(removed)
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

module.exports = {
  getAll, register, login, clear
}
