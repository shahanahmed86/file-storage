import { Express } from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import { serve, setup, SwaggerOptions } from 'swagger-ui-express';

const options: SwaggerOptions = {
	definition: {
		openapi: '3.0.0',
		info: {
			version: '1.0.0',
			title: 'file-storage',
			description: 'A typescript nodejs server to serve file upload',
		},
		basePath: '/',
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT',
				},
			},
		},
		security: [
			{
				bearerAuth: [],
			},
		],
	},
	apis: ['**/*.swagger.yml'], // files containing annotations as above
};

// swagger setup
const specs = swaggerJsDoc(options);

const swagger = (app: Express) => {
	app.use('/api-docs', serve);
	app.get('/api-docs', setup(specs));
};

export default swagger;
