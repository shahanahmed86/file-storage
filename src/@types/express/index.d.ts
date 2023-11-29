import 'express';
import { HttpError } from '../../utils/errors.util';

declare global {
	namespace Express {
		interface Locals {
			error?: HttpError | null;
		}
	}
}
