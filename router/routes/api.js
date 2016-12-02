var express = require('express');
var router = express.Router();
var api = require('../../controllers/api');


router.get('/getrandomvid', api.getRandomVid);
router.get('/getvidrange/:start/:end', api.getVidRange);

// get the last 50 videos in the history for the logged in user
router.get('/gethistory', api.getVideoHistory);

module.exports = router;