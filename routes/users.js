var express = require('express');
const path = require('path');
var router = express.Router();
const userController = require('../controllers/user.js');


router.get('/login', userController.getLogin);

router.get('/register', userController.getRegister);

module.exports = router;
