var express = require('express');
var router = express.Router();
const auth = require('./auth');
const authorize = require('../services/authService').authenticateToken;

/* GET home page. */
router.post('/auth/register', auth.register);
router.post('/auth/login', auth.login);

router.get('/devices/:id', authorize, (req, resp) => {
  resp.json({ok: 1}); 
});

module.exports = router;
