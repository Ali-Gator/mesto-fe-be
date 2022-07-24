const router = require('express').Router();
const NotFoundError = require('../errors/not-found-err');
const { NOT_FOUND_ROUTE } = require('../utils/constants');

router.all('/', (req, res, next) => {
  try {
    throw new NotFoundError(NOT_FOUND_ROUTE);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
