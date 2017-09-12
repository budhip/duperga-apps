var express = require('express');
var router = express.Router();
var Inflation = require('../models/inflation')

/* GET YEAR. */
router.get('/', function(req, res, next) {
  Inflation.findOne({ year: req.query.year })
  .then(found => {
    res.send(found)
  })
  .catch(err => {
    res.status(500).send(err)
  })
});

module.exports = router;
