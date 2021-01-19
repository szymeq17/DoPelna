var express = require('express');
const path = require('path');
var router = express.Router();
const mainController = require('../controllers/main');


/* GET home page. */
router.get('/', mainController.getIndex);

router.get('/add-price', mainController.getAddPrice);

router.get('/add-station', mainController.getAddStation);

module.exports = router;
