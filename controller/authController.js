const logger = require('../logger');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const UsersRepo = require('../repository/UsersRepository')

const signin = async(req, res) => {
    try {
      const token = jwt.sign({ email: req.body.email }, config.secret,
        {
          algorithm: 'HS256',
          allowInsecureKeySizes: true,
          expiresIn: 86400, // 24 hours
        });
        res.status(200).send({
          accessToken: token
        });
    } catch (error) {
      logger.error("error occured in signin", error);
    }
}

const register = async(req, res) => {
    try {
      const schema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required()
    });
    //validate the request
      const {password, ...value} = await schema.validateAsync(req.body);

      //hash password using bcrypt
      const hashPass =await bcrypt.hash(password, 10);
      const response = UsersRepo.add({password: hashPass, ...value});
        res.send("user registered successfully");
    } catch (error) {
        logger.error("error occured in register", error);
    }
};

const logout = async(req, res) => {
    // req.logout();
    // res.redirect('/login');
}

module.exports = {
    signin,
    register, 
    logout
};