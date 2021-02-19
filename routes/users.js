var express = require('express');
const path = require('path');
var router = express.Router();
const userController = require('../controllers/user.js');


router.get('/login', userController.getLogin);

router.get('/register', userController.getRegister);

router.get('/logout', userController.getLogout);

router.post('/login', userController.postLogin);

router.post('/register', userController.postRegister);

router.get('/my-profile', userController.getMyProfile);

module.exports = router;
