const db = require('../models');
var jwt = require('jsonwebtoken');
const secret = require('../config/config.js').secret;

async function register(req, res, next) {
  if (!req.body.email) {
    return res.status(400).json({message: 'email is missing'});
  }
  if (!req.body.password) {
    return res.status(400).json({ message: 'password is missing' });
  }

  try {
    const user = await db.User.create({
      email: req.body.email,
      password: req.body.password
    });
    return res.status(200).json({
      user,
      token: jwt.sign({ email: user.email }, secret, { expiresIn: '1h' })
    });

  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({message: 'email is taken'});
    }
    next(err);
  }
}

async function login(req, res, next) {
  if (!req.body.email) {
    return res.status(400).json({ message: 'email is missing' });
  }
  if (!req.body.password) {
    return res.status(400).json({ message: 'password is missing' });
  }
  try {
    const user = await db.User.findOne({where: {email: req.body.email}});
    if (!user || !user.validatePassword(req.body.password)) {
      return res.status(401).json({message: 'invalid email or password'})
    }
    return res.status(200).json({
      user,
      token: jwt.sign({ email: user.email }, secret, { expiresIn: '1h' })
    });
  } catch(err) {
    next(err);
  }
}

module.exports = {
  register,
  login
};