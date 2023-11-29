import { ZodError } from 'zod';
import { translate } from '../library/i18n.library';

export class HttpError extends Error {
	public status: number;

	constructor(status: number, message: string | string[]) {
		super();
		this.status = status;
		this.message = this.generateMessage(message);
	}

	generateMessage(message: string | string[]) {
		if (!Array.isArray(message)) return translate(message);

		const [msg, arg] = message;
		return translate(msg, arg);
	}
}

export class BadRequest extends HttpError {
	constructor(message: string | string[] = 'error.badRequest') {
		super(400, message);
	}
}

export class NotFound extends HttpError {
	constructor(message: string | string[] = 'error.notFound') {
		super(404, message);
	}
}

export class ConflictError extends HttpError {
	constructor(message: string | string[] = 'error.conflict') {
		super(409, message);
	}
}

export class InternalError extends HttpError {
	constructor(message: string | string[] = 'error.internalError') {
		super(500, message);
	}
}

export class ServerBusyError extends HttpError {
	constructor(message: string | string[] = 'error.serverBusy') {
		super(503, message);
	}
}

export class TooManyRequest extends HttpError {
	constructor(message: string | string[] = 'error.tooManyRequests') {
		super(429, message);
	}
}

export const convertUnknownIntoError = (e: unknown): HttpError => {
	let err;

	if (e instanceof HttpError) err = e;
	else if (typeof e === 'string' && e) err = new ConflictError(e);
	else if (e instanceof ZodError) {
		const message = e.errors.map(({ message: m }) => m).join(', ');
		err = new ConflictError(message);
	} else if (e instanceof Error) err = new ConflictError(e.message);
	else err = new InternalError();

	// this will remove inverted commas from an error string
	err.message = err.message.replace(/['"]+/g, '');

	return err;
};

export default {
	BadRequest,
	NotFound,
	ConflictError,
	convertUnknownIntoError,
};
