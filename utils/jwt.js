const jwt = require('jwt-simple');
const moment = require('moment');

const createToken = async (data) => {
  const payload = {
    data,
    iat: moment().unix(),
    exp: moment().add(20, 'days').unix(),
  };
  return jwt.encode(payload, process.env.JWT_KEY);
};
const decodeToken = (token) => {
  try {
    const payload = jwt.decode(token, process.env.JWT_KEY);

    if (payload.exp <= moment().unix()) {
      return {
        isValid: false,
        message: 'The token has expired',
      };
    }
    return {
      isValid: true,
      ...payload,
    };
  } catch (ex) {
    return {
      isValid: false,
      message: 'The token is invalid',
    };
  }
};

module.exports = {
  createToken,
  decodeToken,
};