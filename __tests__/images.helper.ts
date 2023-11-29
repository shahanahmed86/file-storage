import chai from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
import httpServer from '../src';

const BASE_URL = '/api/common';

chai.use(chaiHttp);

export const uploadImage = (imagePath = './src/assets/404.png') => {
	return chai
		.request(httpServer)
		.post(`${BASE_URL}/images`)
		.set('content-type', 'multipart/form-data')
		.attach('uploadedFile', fs.readFileSync(imagePath), {
			contentType: 'image/png',
			filename: '404.png',
		});
};

export const getImage = (filename: string) => {
	return chai.request(httpServer).get(`${BASE_URL}/images?filename=${filename}`);
};

export const deleteImage = (filename: string) => {
	return chai.request(httpServer).delete(`${BASE_URL}/images?filename=${filename}`);
};
