import chai from 'chai';
import chaiHttp from 'chai-http';
import { deleteImage, getImage, uploadImage } from './images.helper';

chai.use(chaiHttp);

const { expect } = chai;

describe('RESTful - Common APIs', function () {
	it('upload image', async () => {
		const { error, body, status } = await uploadImage();

		expect(error).to.be.false;
		expect(status).to.be.equal(201);
		expect(body.data).to.contains('temp/');

		const res = await deleteImage(body.data);
		expect(res.error).to.be.false;
		expect(res.status).to.be.equal(200);
	});

	it('get image', async () => {
		const { body } = await uploadImage();

		let res = await getImage(body.data);
		expect(res.error).to.be.false;

		res = await deleteImage(body.data);
		expect(res.error).to.be.false;
		expect(res.status).to.be.equal(200);
	});

	it('delete image', async () => {
		const { body } = await uploadImage();

		let res = await deleteImage(body.data);
		expect(res.error).to.be.false;
		expect(res.status).to.be.equal(200);

		res = await deleteImage(body.data);
		expect(res.error).not.to.be.false;
		expect(res.status).to.be.equal(404);
	});
});
