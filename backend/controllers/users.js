const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

const { NODE_ENV, JWT_SECRET } = process.env;
const {
  NOT_FOUND_MESSAGE, BAD_REQUEST_MESSAGE, NOT_FOUND_ERR, CONFLICT_MESSAGE,
} = require('../utils/constants');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request');
const ConflictError = require('../errors/conflict');

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    if (!users) throw new NotFoundError(NOT_FOUND_MESSAGE);
    res.send(users);
  } catch (err) {
    next(err);
  }
};

module.exports.getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) throw new NotFoundError(NOT_FOUND_MESSAGE);
    res.send(user);
  } catch (err) {
    next(err);
  }
};

module.exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) throw new NotFoundError(NOT_FOUND_MESSAGE);
    res.send(user);
  } catch (err) {
    next(err);
  }
};

module.exports.createUser = async (req, res, next) => {
  try {
    const {
      name, about, avatar, email, password,
    } = req.body;
    const passwordHashed = await bcrypt.hash(password, 10);
    await User.create({
      name, about, avatar, email, password: passwordHashed,
    });
    res.send({
      name, about, avatar, email,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(BAD_REQUEST_MESSAGE));
    } else if (err.code === 11000) {
      next(new ConflictError(CONFLICT_MESSAGE));
    } else {
      next(err);
    }
  }
};

module.exports.patchProfile = async (req, res, next) => {
  try {
    const { name, about } = req.body;
    const userId = req.user._id;

    const user = await User.findOneAndUpdate(
      userId, // this is the ID filter
      { name, about },
      {
        new: true,
        runValidators: true,
      },
    );
    if (!user) throw new NotFoundError(NOT_FOUND_ERR);
    res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(BAD_REQUEST_MESSAGE));
    } else {
      next(err);
    }
  }
};

module.exports.patchAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;
    const userId = req.user._id;

    const user = await User.findOneAndUpdate(
      userId, // this is the ID filter
      { avatar },
      {
        new: true,
        runValidators: true,
      },
    );
    if (!user) throw new NotFoundError(NOT_FOUND_ERR);
    res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(BAD_REQUEST_MESSAGE));
    } else {
      next(err);
    }
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      { expiresIn: '7d' },
    );
    res.send({ token });
  } catch (err) {
    next(err);
  }
};
