import { NextFunction, Request, Response } from 'express';
import toobusy from 'toobusy-js';
import { ServerBusyError } from '../utils/errors.util';

const tooBusy = (req: Request, res: Response, next: NextFunction) => {
	const isBusy = toobusy();
	if (isBusy) {
		const error = new ServerBusyError();
		return next(error);
	}

	next();
};

toobusy.onLag(function (currentLag: number): void {
	if (currentLag < 1000) return;
	console.error('Event loop lag detected! Latency: ' + currentLag + 'ms');
});

export default tooBusy;
