import { Router } from 'express';
import os from 'os';
import imageRoutes from './images/images.routes';

const router = Router();

// healthcheck
router.get('/healthcheck', (_req, res) => {
	res.send(`I am healthy, from host ${os.hostname()}!\n`);
});

// common routes
router.use('/v1/images', imageRoutes);

export default router;
