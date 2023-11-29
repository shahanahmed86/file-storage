import { Request } from 'express';
import file from '../../library/file.library';
import { NotFound } from '../../utils/errors.util';
import { validateRequest } from '../../utils/logics.util';
import { FileRef } from '../../validations';

export const removeImage = async (req: Request<FileRef>) => {
	const _args = { ...req.params, ...req.query };
	const args = await validateRequest(FileRef, _args);

	if (!file.deleteOldFileLocally(args.filename)) {
		throw new NotFound('images.removeImageFailed');
	}

	return 'images.removeImage';
};
