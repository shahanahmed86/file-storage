import { Request, Response } from 'express';
import fs from 'fs';
import morgan from 'morgan';
import os from 'os';
import { inProd } from '../config';
import { MORGAN_TOKENS } from '../utils/constants.util';

morgan.token('host', os.hostname);
morgan.token('error', (_, res: Response) => {
	if (!res.locals.error) return '';
	return res.locals.error.message;
});

const skip = (_req: Request, res: Response) => (inProd ? res.statusCode < 400 : false);
const stream = inProd ? fs.createWriteStream('./error.log', { flags: 'a' }) : undefined;

const logger = morgan(MORGAN_TOKENS, { skip, stream });

export default logger;
