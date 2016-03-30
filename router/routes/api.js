var express = require('express');
var router = express.Router();
var api = require('../../controllers/api');


router.get('/getrandomvid', api.getRandomVid);
router.get('/submit', api.getSubmitVid);
router.post('/submit', api.postSubmitVid);

module.exports = router;