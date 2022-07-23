const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUserById, patchProfile, patchAvatar, getCurrentUser,
} = require('../controllers/users');
const { URL_REGEXP } = require('../utils/constants');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
}), getUserById);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), patchProfile);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().pattern(URL_REGEXP).required(),
  }),
}), patchAvatar);

module.exports = router;
