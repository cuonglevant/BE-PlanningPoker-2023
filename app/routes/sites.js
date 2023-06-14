const express = require('express');
const router = express.Router();
const siteController = require('../controllers/site.js');

router.get('/', siteController.loadServer);
module.exports = router;
