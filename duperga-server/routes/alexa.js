var express = require('express');
var router = express.Router();

var alexaCtrl = require('../controllers/alexaController')

router.post('/predictSaving', alexaCtrl.predictSaving)
router.post('/predictMonthly', alexaCtrl.predictMonthly)
router.post('/save', alexaCtrl.save)



module.exports = router;
