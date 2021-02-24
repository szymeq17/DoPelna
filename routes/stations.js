var express = require('express');
const path = require('path');
var router = express.Router();
const stationController = require('../controllers/station.js');
const auth = require('../middleware/is-auth');

router.get('/add-station', auth, stationController.getAddStation);

router.post('/add-station', auth, stationController.postAddStation);

router.get('/station/:id', stationController.getStation);

router.get('/find-stations', stationController.getfindStations);

module.exports = router;