'use strict';
var passport = require('passport');
var express = require('express');
var router = express.Router();
var admin = require('../../controllers/admin');

router.all('*', admin.needsAdmin);
router.get('/', admin.getIndex);
router.get('/submit', admin.getSubmitVid);
router.post('/submit', admin.postSubmitVid);
router.get('/remove', admin.getRemoveVid);
router.post('/remove', admin.postRemoveVid);

module.exports = router;