import i18n from 'i18n';
import { Request, Response } from 'express';
import { LANGUAGES, LANGUAGE_HEADER } from '../../utils/constants.util';
import { BadRequest } from '../../utils/errors.util';

export const checkLanguage = (req: Request, res: Response) => {
	const lang = (req.get(LANGUAGE_HEADER) || req.headers[LANGUAGE_HEADER] || 'en').toString();
	const isValidLang = LANGUAGES.includes(lang);

	if (!isValidLang) throw new BadRequest('error.invalidLanguage');

	res.locals.lang = lang;
	i18n.setLocale(lang);
};
