import { NextFunction, Request, Response, Router } from 'express';
import controllers from '../../controllers';
import { convertUnknownIntoError } from './../../utils/errors.util';
import { FileRef } from '../../validations';

const router = Router();

router.get('/:filename?', async (req: Request<FileRef>, res: Response, next: NextFunction) => {
	try {
		const image = await controllers.image.getImage(req);

		res.attachment(image.filename).send(image.path);
	} catch (e) {
		const error = convertUnknownIntoError(e);
		next(error);
	}
});

router
	.route('/')
	.post(async (req: Request, res: Response, next: NextFunction) => {
		try {
			const result = await controllers.image.upload(req);
			res.status(201).send(result);
		} catch (e) {
			const error = convertUnknownIntoError(e);
			next(error);
		}
	})
	.delete(async (req: Request<FileRef>, res: Response, next: NextFunction) => {
		try {
			const result = await controllers.image.removeImage(req);
			res.status(200).send(result);
		} catch (e) {
			const error = convertUnknownIntoError(e);
			next(error);
		}
	});

export default router;
