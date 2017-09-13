
var Wishlist = require('../models/wishlist')
var wishes = require('./wishes')

var create = (req, res) => {
  let newWish = new Wishlist({
    name: req.body.name,
    time_period: req.body.time_period,
    current_price: req.body.current_price,
    current_saving: req.body.current_saving,
    predicted_budget: req.body.predicted_budget,
    predicted_price: req.body.predicted_price,
  })

  newWish.save()
  .then(created => {
    res.send(created)
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

var getAll = (req,res) => {
  Wishlist.find({}).sort({createdAt: -1})
  .then(list => {
    res.send(list)
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

var search = (req, res) => {
  Wishlist.findOne({name: req.body.name})
  .then(item => {
    res.send(item)
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

var getById = (req, res) => {
  Wishlist.findById(req.params.wishlistID)
  .then(item => {
    res.send(item)
  })
  .catch(err => {
    err.status(500).send(err)
  })
}

var remove = (req, res) => {
  Wishlist.findByIdAndRemove(req.params.id)
  .then(removed => {
    res.send(removed)
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

var seed = (req, res) => {
  Wishlist.insertMany(wishes)
  .then(created => {
    res.send(created)
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

var update = (req, res) => {
  Wishlist.findByIdAndUpdate(req.params.wishlistID, req.body, { new: true })
  .then(updated => {
    res.send(updated)
  })
  .catch(err => {
    res.status(500).send(err)
  })
}

var clear = (req, res) => {
  Wishlist.remove({})
  .then(removed => {
    res.send(removed)
  })
  .catch(err => {
    res.status(500).send(err)
  })
}


module.exports = {
  create,
  getAll,
  getById,
  search,
  remove,
  update,
  seed,
  clear
}
