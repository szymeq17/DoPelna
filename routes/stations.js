var express = require('express');
const path = require('path');
var router = express.Router();
const stationController = require('../controllers/station.js');

router.get('/add-station', stationController.getAddStation);

router.post('/add-station', stationController.postAddStation);

module.exports = router;