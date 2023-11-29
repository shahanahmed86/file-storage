import { NextFunction, Request, Response } from 'express';
import controllers from '../controllers';

export const checkLanguage = (req: Request, res: Response, next: NextFunction) => {
	try {
		controllers.middleware.checkLanguage(req, res);

		next();
	} catch (e) {
		next(e);
	}
};
