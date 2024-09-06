const jwt = require('jwt-simple');
const moment = require('moment');

const secret = process.env.JWT_KEY;

exports.ensureAuth = function (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({
      message: 'The request does not have the authentication header',
    });
  }

  const token = req.headers.authorization.replace(/['"]+/g, '').replace('Bearer ', '');

  try {
    var payload = jwt.decode(token, secret);
    // console.log(payload)

    if (payload.exp <= moment().unix()) {
      return res.status(401).send({
        message: 'The token has expired',
      });
    }
  } catch (ex) {
    // console.log(ex)
    return res.status(404).send({
      message: 'The token is invalid',
    });
  }

  req.user = payload;

  next();
};
