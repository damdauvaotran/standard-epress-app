import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  // List of files to be processed.
  apis: ['./src/apis/**/*.ts', './src/models/**/*.ts'],
  swaggerDefinition: {
    basePath: '/api/v1',
    info: {
      description: 'Test API with autogenerated swagger doc',
      swagger: '2.0',
      title: 'Todo API',
      version: '1.0.0',
    },
    securityDefinitions: {
      Bearer: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
    },
  },
};
const specs = swaggerJsdoc(options);
export default specs;
