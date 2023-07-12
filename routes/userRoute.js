const express = require('express');
const router = express.Router();
const userCtrl = require('../controller/userController');
const {verifyToken} = require('../middleware/authJwt')

router.get('/getAllUsers',[verifyToken],userCtrl.getAllUsers);

router.post('/addNewUser',[verifyToken], userCtrl.addNewUser);

module.exports = router;
