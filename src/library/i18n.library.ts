import { Express } from 'express';
import i18n from 'i18n';
import path from 'path';
import { checkLanguage } from '../middleware/lang.middleware';
import { LANGUAGES, LANGUAGE_HEADER } from '../utils/constants.util';

export const setLanguage = (app: Express) => {
	i18n.configure({
		locales: LANGUAGES,
		directory: path.resolve(__dirname, '../locales'),
		objectNotation: true,
		header: LANGUAGE_HEADER,
		updateFiles: false,
	});

	app.use(i18n.init);
	app.use(checkLanguage);
};

export const translate = (key: string, arg?: string) => {
	if (!arg) return i18n.__(key);
	return i18n.__(key, arg);
};
