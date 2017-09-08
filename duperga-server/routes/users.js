var express = require('express');
var router = express.Router();

var userCtrl = require('../controllers/usersController')

/* GET users listing. */
router.get('/', userCtrl.getAll);
router.post('/login', userCtrl.login)
router.post('/register', userCtrl.register)
router.delete('/clear', userCtrl.clear)

module.exports = router;
