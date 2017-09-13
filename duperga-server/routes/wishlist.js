var express = require('express');
var router = express.Router();

var wishCtrl = require('../controllers/wishlistController')

/* GET users listing. */
router.get('/', wishCtrl.getAll);
router.get('/:wishlistID', wishCtrl.getById)
router.post('/', wishCtrl.create)
router.post('/search', wishCtrl.search)
router.post('/seed', wishCtrl.seed)
router.put('/:wishlistID', wishCtrl.update)
router.delete('/clear', wishCtrl.clear)
router.delete('/:id', wishCtrl.remove)

module.exports = router;
