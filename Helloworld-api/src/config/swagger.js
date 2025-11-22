
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog API Documentation',
      description: 'Interactive documentation for the Node.js Blog API project.',
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Development server' }
    ],
    tags: [
      { name: 'Authentication', description: 'User registration and login' },
      { name: 'Users', description: 'User profile management' },
      { name: 'Posts', description: 'CRUD operations for posts' },
      { name: 'Comments', description: 'CRUD operations for comments' },
      { name: 'Photos', description: 'Upload, list, and delete photos' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token here'
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ['./src/api/v1/Routes/*.js'] 
};

export const swaggerSpec = swaggerJsdoc(options);
