const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { URL_REGEXP } = require('../utils/constants');
const { createUser } = require('../controllers/users');

router.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(URL_REGEXP),
  }),
}), createUser);

module.exports = router;
