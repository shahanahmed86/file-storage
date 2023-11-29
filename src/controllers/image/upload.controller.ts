import { Request } from 'express';
import file from '../../library/file.library';
import { NotFound } from '../../utils/errors.util';

export const upload = async (req: Request) => {
	if (!req.files) throw new NotFound('images.noAttachment');

	return file.localUpload(req.files);
};
