import { Request } from 'express';
import file from '../../library/file.library';
import { validateRequest } from '../../utils/logics.util';
import { FileRef } from '../../validations';

export const getImage = async (req: Request<FileRef>) => {
	const _args = { ...req.params, ...req.query };
	const args = await validateRequest(FileRef, _args);

	const { filename } = args;
	const path = file.getFilePath(filename);

	return { path, filename };
};
