const jwt = require('jsonwebtoken');
const { UNAUTHORIZED_MESSAGE_TOKEN } = require('../utils/constants');
const UnauthorizedError = require('../errors/unauthorized');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  try {
    const tokenFull = req.headers.authorization;
    if (tokenFull) {
      const token = tokenFull.replace('Bearer ', '');
      jwt.verify(
        token,
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        (err, decoded) => {
          if (err) throw new UnauthorizedError(UNAUTHORIZED_MESSAGE_TOKEN);
          req.user = decoded;
        },
      );
    } else {
      throw new UnauthorizedError(UNAUTHORIZED_MESSAGE_TOKEN);
    }
    next();
  } catch (err) {
    next(err);
  }
};
