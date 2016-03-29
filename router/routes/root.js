var passport = require('passport');
var express = require('express');
var router = express.Router();
var root = require('../../controllers/root');

router.get('/', root.getIndex);
router.get('/register', root.getRegister);
router.post('/register', root.postRegister);
router.get('/login', root.getLogin);
router.post('/login', root.postLogin);
router.get('/logout', root.getLogout);

module.exports = router;