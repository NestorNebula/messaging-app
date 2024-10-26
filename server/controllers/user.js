const prisma = require('../models/queries');
const Sperror = require('sperror');

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

const putUser = () => {};

module.exports = { getUser, putUser };
