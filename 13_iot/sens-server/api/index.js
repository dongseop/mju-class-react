var express = require('express');
var router = express.Router();
const auth = require('./auth');
/* GET home page. */
router.post('/auth/register', auth.register);

module.exports = router;
