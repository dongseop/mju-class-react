var jwt = require('jsonwebtoken');
const config = require('../config/config.js');

function getToken(req) {
  if (req.header('Authorization')) {
    const parts = req.header('Authorization').split(' ');
    if (parts.length === 2) {
      return parts[1];
    } else if (parts.length === 1) {
      return parts[0];
    } 
  } else if (req.header('api_key')) {
    return req.header('api_key');
  } else if (req.body && req.body.token) {
    return req.body.token;
  }
  return "";
}

const authenticateToken = (req, resp, next) => {
  const token = getToken(req);
  if (token && jwt.verify(token, config.secret)) {
    return next();
  }
  return resp.status(401).json({message: 'Unauthorized'})
}

module.exports = {
  getToken: getToken,
  authenticateToken
}
