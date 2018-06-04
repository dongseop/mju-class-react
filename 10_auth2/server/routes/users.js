var express = require('express');
var axios = require('axios');

var router = express.Router();
/* GET users listing. */
router.get('/', function(req, res) {
  axios.get('https://randomuser.me/api/?results=100')
    .then( users => res.json(users));
});

module.exports = router;
