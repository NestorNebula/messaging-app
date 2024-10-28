const prisma = require('../models/queries');
const Sperror = require('sperror');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const { validateUpdateUser } = require('../helpers/validation');

const getUser = async (req, res, next) => {
  const requestedUserId = +req.params.userId;
  if (req.user.id !== requestedUserId) {
    return next(new Sperror('Forbidden', "You can't access this data.", 403));
  }
  const user = await prisma.getUser(requestedUserId);
  if (!user) {
    return next(new Sperror('Not Found', "The user couldn't be found.", 404));
  }
  res.json({ user });
};

const putUser = [
  validateUpdateUser,
  async (req, res, next) => {
    const userIdToUpdate = +req.params.userId;
    if (req.user.id !== userIdToUpdate) {
      return next(new Sperror('Forbidden', "You can't update this data.", 403));
    }
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    const userToUpdate = await prisma.getUserInformations(userIdToUpdate);
    if (!userToUpdate) {
      return next(new Sperror('Not Found', "Couldn't found the user.", 404));
    }
    let password = null;
    if (req.body.password) {
      password = bcrypt.hashSync(req.body.password, 10);
    }
    const updatedUser = await prisma.updateUser(userIdToUpdate, {
      username: req.body.username,
      email: req.body.email,
      password: password || userToUpdate.password,
    });
    if (!updatedUser) {
      return next(
        new Sperror('Server Error', 'Error when updating user.', 500)
      );
    }
    res.json({ user: updatedUser });
  },
];

const putUserStatus = async (req, res, next) => {
  const updatedUser = await prisma.updateUserStatus(
    req.user.id,
    req.body.online
  );
  if (!updatedUser) {
    return next(
      new Sperror('Server Error', 'Error when updating status.', 500)
    );
  }
  res.sendStatus(200);
};

const getUserFriends = async (req, res, next) => {
  const userId = +req.params.userId;
  if (req.user.id !== userId) {
    return next(new Sperror('Forbidden', "You can't access this data.", 403));
  }
  const friends = await prisma.getUserFriends(userId);
  if (!friends) {
    return next(new Sperror('Not Found', "Couldn't found the data.", 404));
  }
  res.json({ friends });
};

module.exports = { getUser, putUser, putUserStatus, getUserFriends };
