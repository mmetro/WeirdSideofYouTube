var express = require('express');
var router = express.Router();
var api = require('../../controllers/api');


router.get('/getrandomvid', api.getRandomVid);
router.get('/getvidrange/:start/:end', api.getVidRange);

module.exports = router;