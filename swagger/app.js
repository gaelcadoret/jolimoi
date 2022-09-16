const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

// const swaggerDocument = require('./swagger.json');
//
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Express API for JOLIMOI',
        version: '1.0.0',
    },
};

const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./server/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(3002);
