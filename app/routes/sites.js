import express from 'express';
import siteController from '../controllers/site.js';
const router = express.Router();

router.get('/', siteController.loadServer);

export default router;
