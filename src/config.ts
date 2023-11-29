import 'dotenv/config';

export const {
	APP_PROTOCOL = 'http:',
	APP_HOST = 'localhost:7000',
	APP_PORT = '7000',
	NODE_ENV = 'development',
} = process.env;

export const inProd = NODE_ENV === 'production';

export const baseUrl = `${APP_PROTOCOL}//${APP_HOST}`;
