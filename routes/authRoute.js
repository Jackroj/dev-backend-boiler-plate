const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const logger = require('../logger');
const Joi = require('joi');
const userController = require('../controller/user')

router.post('/login', passport.authenticate('local',{
  failureFlash:true
}), (req, res) =>{
  res.send("welcome")
});
  
  router.get('/dashboard', (req, res) => {
    if (req.isAuthenticated()) {
      res.send('Welcome to the dashboard!');
    } else {
      res.redirect('/login');
    }
  });
  
  router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
  });
  
router.post('/register', async(req, res) => {
  try {
    const schema = Joi.object({
      username: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required()
  });
    const {username, email, password} = await schema.validateAsync(req.body);
    const hashPass =await bcrypt.hash(password, 10);
    const response = userController.add({username: username, email: email, password: hashPass})
    res.send(response)
  } catch (error) {
    logger.error(error)
  }
});

module.exports = router;
