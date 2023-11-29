import { NextFunction, Request, Response } from 'express';
import { inProd } from '../config';
import { NotFound, convertUnknownIntoError } from '../utils/errors.util';

export function notFound(req: Request, res: Response, next: NextFunction) {
	const err = new NotFound();
	next(err);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(e: unknown, req: Request, res: Response, next: NextFunction) {
	const err = convertUnknownIntoError(e);
	res.locals.error = err;

	res.status(err.status);
	res.json({
		message: err.message,
		stack: inProd ? '🥞' : err.stack,
	});
}
