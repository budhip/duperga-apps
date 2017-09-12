var express = require('express');
var router = express.Router();

var alexaCtrl = require('../controllers/alexaController')

router.get('/predictSaving', alexaCtrl.getPredictSaving)
router.get('/predictMonthly', alexaCtrl.getPredictMonthly)
router.get('/predictNewSaving', alexaCtrl.getPredictNewSaving)
router.get('/save', alexaCtrl.getSave)

router.get('/predictAll', alexaCtrl.predictAll)


module.exports = router;
