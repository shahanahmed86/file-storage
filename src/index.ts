import compression from 'compression';
import cors from 'cors';
import express from 'express';
import fileUpload from 'express-fileupload';
import helmet from 'helmet';
import { APP_PORT, baseUrl, inProd } from './config';
import { setLanguage } from './library/i18n.library';
import logger from './library/morgan.library';
import swagger from './library/swagger.library';
import tooBusy from './library/toobusy.library';
import { errorHandler, notFound } from './middleware/error.middleware';
import routes from './routes';
import { SIZE_LIMIT } from './utils/constants.util';

const app = express();

// parser
app.use(express.urlencoded({ extended: true, limit: SIZE_LIMIT }));
app.use(express.json({ limit: SIZE_LIMIT }));

// helmet
app.use(helmet());

// too-busy
app.use(tooBusy);

// cors
app.use(cors());

// compression
app.use(compression());

// enable proxy if it's in prod.
if (inProd) {
	const NUMBER_OF_PROXY = 1;
	app.set('trust proxy', NUMBER_OF_PROXY);
}

// middleware for express-fileupload
app.use(fileUpload({ limits: { fileSize: SIZE_LIMIT } }));

// logs
app.use(logger);

// localization
setLanguage(app);

// disable x-powered-by to avoid giving hint to hackers
app.disable('x-powered-by');

// routings
app.use('/api', routes);

// swagger
if (!inProd) swagger(app);

// when route not found
app.use(notFound);

// error handler
app.use(errorHandler);

app.listen(APP_PORT, () => console.log(`Server is running on ${baseUrl}`));

export default app;
