const prisma = require('../models/queries');
const Sperror = require('sperror');

const getChats = async (req, res, next) => {
  const userId = +req.params.userId;
  if (req.user.id !== userId) {
    return next(new Sperror('Forbidden', "You can't acces this data.", 404));
  }
  const chats = await prisma.getUserChats();
  if (!chats) {
    return next(new Sperror('Server Error', 'Error when fetching chats.', 500));
  }
  res.json({ chats });
};

const postChat = () => {};

const putChat = () => {};

module.exports = { getChats, postChat, putChat };
