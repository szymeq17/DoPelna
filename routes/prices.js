var express = require('express');
const path = require('path');
var router = express.Router();
const priceController = require('../controllers/price.js');
const auth = require('../middleware/is-auth');

router.get('/add-price', auth, priceController.getAddPrice);

router.post('/add-price', auth, priceController.postAddPrice);

module.exports = router;