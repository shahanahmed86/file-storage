import { AnyZodObject } from 'zod';

export type ZodValidator<T> = T extends AnyZodObject ? T : AnyZodObject;
