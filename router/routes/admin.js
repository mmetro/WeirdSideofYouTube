'use strict';
var express = require('express');
var router = express.Router();
var admin = require('../../controllers/admin');

// any url at /admin/ requires an admin user
router.all('*', admin.needsAdmin);
router.get('/', admin.getIndex);
router.post('/submit', admin.postSubmitVid);
router.post('/remove', admin.postRemoveVid);
router.get('/getvidrange/:start/:end', admin.getVidRangeAdmin);
router.get('/crawlreddit', admin.postCrawlReddit);

module.exports = router;
