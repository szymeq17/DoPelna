var express = require('express');
const path = require('path');
var router = express.Router();
const mainController = require('../controllers/main');


/* GET home page. */
router.get('/', mainController.getIndex);

module.exports = router;
