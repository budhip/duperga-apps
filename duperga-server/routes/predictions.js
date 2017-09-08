var express = require('express');
var router = express.Router();

var predictionsCtrl = require('../controllers/predictionsController')

router.post('/', predictionsCtrl.predict)



module.exports = router;
