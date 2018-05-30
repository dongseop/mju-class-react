const express = require('express');
const router = express.Router();
const posts = require('./posts');

router.get('/', (req, res) => {
  res.json({ message: 'welcome to out api' });
});

router.use('/posts', posts);

module.exports = router;