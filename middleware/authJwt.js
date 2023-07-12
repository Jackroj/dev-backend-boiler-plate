const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const logger = require("../logger");

const verifyToken = (req, res, next) => {
  try {
    let token = req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send({
        message: "No token provided!"
      });
    }
  
    jwt.verify(token,
              config.secret,
              (err, decoded) => {
                if (err) {
                  return res.status(401).send({
                    message: "Unauthorized!",
                  });
                }
                req.email = decoded.email;
                next();
              });
  } catch (error) {
    logger.error("error occur verify token", error)
  }
};

module.exports = {
  verifyToken,
};
