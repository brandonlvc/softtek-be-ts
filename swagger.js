const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Opciones para Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Tu API',
      version: '1.0.0',
      description: 'Documentación de tu API',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Cambia esto según tu entorno
      },
    ],
  },
  apis: ['./src/**/*.ts'], // Cambia esto según la ubicación de tus archivos de definición
};

// Generar especificación de Swagger
const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Función para configurar Swagger
const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

module.exports = setupSwagger;
