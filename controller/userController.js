const logger = require('../logger');
const UsersRepo = require('../repository/UsersRepository')


/**
 * @swagger
 * definitions:
 *   success_response:
 *     properties:
 *       code:
 *         type: boolean
 *       message:
 *         type: string
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
 * /user/getAllUsers:
 *   get:
 *     tags:
 *        - AllUsers
*     security:
 *       - BearerAuth: []
 *     content:
 *         application/json:
 *     responses:
 *       200:
 *         description: Fetch all users
 *         schema:
 *           $ref: '#/definitions/success_response'
 *       400:
 *         description: Incorrect Credentials
 *         schema:
 *           $ref: '#/definitions/error_response'
 *       500:
 *         description: Something went wrong, Please try again later
 *         schema:
 *           $ref: '#/definitions/error_response'
 * securityDefinitions:
 *   BearerAuth:
 *     type: apiKey
 *     in: header
 *     name: x-access-token
 */


const getAllUsers = async (req, res) => {
    try {
        const response = await UsersRepo.getAll();
        res.status(200).send({
                    code: true,
                    message: 'All users fetched',
                    data: response,
                });
    } catch (error) {
        logger.error("error occured in getAllUsers", error);
        return res.status(422).send({code: false , message: "Something went wrong, Please try again later"});
    }}

module.exports = {
    getAllUsers
}