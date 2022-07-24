const { ALLOWED_CORS } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { headers: { origin } } = req;
  if (ALLOWED_CORS.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  }
};
