import express from 'express';
import siteController from '../controllers/site';

const router = express.Router();

router.get('/', siteController.loadServer);

export default router;
