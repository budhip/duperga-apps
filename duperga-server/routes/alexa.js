var express = require('express');
var router = express.Router();

var alexaCtrl = require('../controllers/alexaController')

router.get('/predictSaving', alexaCtrl.getPredictSaving)
router.get('/predictMonthly', alexaCtrl.getPredictMonthly)
router.get('/predictNewSaving', alexaCtrl.getPredictNewSaving)
router.get('/save', alexaCtrl.getSave)

router.post('/predictSaving', alexaCtrl.predictSaving)
router.post('/predictNewSaving', alexaCtrl.predictNewSaving)
router.post('/predictMonthly', alexaCtrl.predictMonthly)
router.post('/save', alexaCtrl.save)
router.post('/predictAll', alexaCtrl.predictAll)


module.exports = router;
