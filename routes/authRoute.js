const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controller/authController')

router.post('/signin', passport.authenticate('local',{ failureFlash:true }), authController.signin);
  
router.get('/logout', authController.logout);
  
router.post('/register', authController.register);

module.exports = router;
