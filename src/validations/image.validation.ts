import * as z from 'zod';

export const FileRef = z.object({
	filename: z.string().describe('Filename'),
});
export type FileRef = z.infer<typeof FileRef>;
