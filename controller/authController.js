const logger = require('../logger');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const UsersRepo = require('../repository/UsersRepository')

/**
 * @swagger
 * definitions:
 *   success_response_singin:
 *     properties:
 *       code:
 *         type: boolean
 *       message:
 *         type: string
 *       accessToken:
 *         type: string
 *   success_response_register:
 *     properties:
 *       code:
 *         type: boolean
 *       message:
 *         type: string
 *   stocks:
 *    properties:
 *      email:
 *        type: string
 *      password:
 *        type: string
 *   error_response:
 *     properties:
 *       code:
 *         type: boolean
 *       message:
 *         type: string
 */

/**
 * @swagger
 *
 * /auth/signin:
 *   post:
 *     tags:
 *        - Sigin
 *     parameters:
 *      - name: body
 *        in: body
 *        schema:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *            password:
 *              type: string
 *     content:
 *         application/json:
 *     responses:
 *       200:
 *         description: User Signin
 *         schema:
 *           $ref: '#/definitions/success_response_singin'
 *       400:
 *         description: Incorrect Credentials
 *         schema:
 *           $ref: '#/definitions/error_response'
 *       500:
 *         description: Something went wrong, Please try again later
 *         schema:
 *           $ref: '#/definitions/error_response'
 */

const signin = async(req, res) => {
    try {
      const token = jwt.sign({ email: req.body.email }, config.secret,
        {
          algorithm: 'HS256',
          allowInsecureKeySizes: true,
          expiresIn: 86400, // 24 hours
        });
        return res.status(200).send({
          code: true,
          message: 'success',
          accessToken: token
        });
    } catch (error) {
      logger.error("error occured in signin", error);
      return res.status(422).send({code: false , message: "Something went wrong, Please try again later"});
    }
}


/**
 * @swagger
 *
 * /auth/register:
 *   post:
 *     security:
 *        - bearerAuth: []
 *        - Audience: []
 *     tags:
 *        - Register
 *     parameters:
 *      - name: body
 *        in: body
 *        schema:
 *          type: object
 *          properties:
 *            username: 
 *              type: string
 *            email:
 *              type: string
 *            password:
 *              type: string
 *     content:
 *         application/json:
 *     responses:
 *       200:
 *         description: User Registration
 *         schema:
 *           $ref: '#/definitions/success_response_register'
 *       400:
 *         description: Incorrect Credentials
 *         schema:
 *           $ref: '#/definitions/error_response'
 *       500:
 *         description: Something went wrong, Please try again later
 *         schema:
 *           $ref: '#/definitions/error_response'
 */
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
      return res.status(200).send({
        code: true,
        message: 'user registered successfully'
      });
    } catch (error) {
        logger.error("error occured in register", error);
      return res.status(422).send({code: false ,message: 'Something went wrong, Please try again later'});
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