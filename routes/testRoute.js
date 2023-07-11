const express = require('express');
const router = express.Router();
const Joi = require('joi');
const logger = require('../logger')

router.get('/', async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().required()
    });
    try {
        const value = await schema.validateAsync(req.query);
        logger.info("test get", value)
        res.send(`Hello ${value.name}`);
        
    }
    catch (error) {
        logger.error("test get", error)
        res.send(error);
    }
});

router.post('/', async(req, res) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required().email()
    });
    try {
        const value = await schema.validateAsync(req.body);
        res.send(`Hello ${value.name}`);
    }
    catch (error) {
        res.send(error);
    }
});

module.exports = router;
