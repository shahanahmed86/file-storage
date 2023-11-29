export const MORGAN_TOKENS: string = [
	':host',
	':date[iso]',
	':method',
	':remote-addr',
	':status',
	':url',
	':user-agent',
	':response-time',
	':error',
].join(' ');

export const SIZE_LIMIT = 10 * 1024 * 1024;

export const LANGUAGES = ['en'];

export const LANGUAGE_HEADER = 'LANGUAGE';
