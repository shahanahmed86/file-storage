import { randomUUID } from 'crypto';
import { ZodValidator } from '../@types/library.type';

export const getUniqueId = () => randomUUID();

export function validateRequest<T, A>(validators: ZodValidator<T>, args: A) {
	return validators.parseAsync(args) as Promise<A>;
}
