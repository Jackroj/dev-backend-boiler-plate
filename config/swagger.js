const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swagger = function (app) {
  // swagger definition
  const swaggerDefinition = {
    info: {
      title: 'REST - Swagger',
      version: '1.0.0',
      description: 'REST API with Swagger doc',
    },
    tags: [
      {
        name: 'REST API',
        description: 'back end boiler-plate',
      },
    ],
    schemes: ['http'],
    host: 'localhost:3033',
    basePath: '/',
  };

  const options = {
    swaggerDefinition: swaggerDefinition,
    apis: ['./**/**/authController.js', './**/**/userController.js'],
    
  };
  const swaggerSpec = swaggerJSDoc(options);

  app.get('/json', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  app.use("/swagger-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

};
module.exports = swagger;