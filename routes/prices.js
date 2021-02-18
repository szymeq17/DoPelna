var express = require('express');
const path = require('path');
var router = express.Router();
const priceController = require('../controllers/price.js');

router.get('/add-price', priceController.getAddPrice);

//router.post('/add-price', priceController.postAddPrice);

module.exports = router;