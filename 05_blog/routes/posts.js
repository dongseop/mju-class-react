const express = require('express');
const router = express.Router();
const Post = require('../models').Post;
const catchErrors = require('../async-error');

router.get('/', catchErrors(async (req, res) => {
  const posts = await Post.all();
  res.status(200).send(posts);
}));

router.get('/:id', catchErrors(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    res.status(200).send(post);
  } else {
    res.status(404).send({error: 'Not exist id'});
  }
}));

router.put('/:id', catchErrors(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    await post.update({
      title: req.body.title || post.title,
      name: req.body.name || post.name,
      content: req.body.content || post.content
    });
    res.status(200).send(post);
  } else {
    res.status(404).send({ error: 'Not exist id' });
  }
}));

router.post('/', catchErrors(async (req, res) => {
  const post = await Post.create({
    title: req.body.title,
    name: req.body.name,
    content: req.body.content
  });
  res.status(201).send(post);
}));

router.delete('/:id', catchErrors(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    await post.destroy();
    res.status(204).send({});
  } else {
    res.status(404).send({ error: 'Not exist id' });
  }
}));

module.exports = router;