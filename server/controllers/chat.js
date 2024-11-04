const prisma = require('../models/queries');
const Sperror = require('sperror');

const getChats = async (req, res, next) => {
  const userId = +req.params.userId;
  if (req.user.id !== userId) {
    return next(new Sperror('Forbidden', "You can't acces this data.", 404));
  }
  const chats = await prisma.getUserChats(req.user.id);
  if (!chats) {
    return next(new Sperror('Server Error', 'Error when fetching chats.', 500));
  }
  res.json({ chats });
};

const postChat = async (req, res, next) => {
  const usersArray = JSON.parse(req.body.users);
  if (!Array.isArray(usersArray)) {
    return next(
      new Sperror(
        'Bad Request',
        'No user list provided for chat creation.',
        400
      )
    );
  }
  usersArray.unshift(req.user.id);
  usersArray.forEach((user, index) => (usersArray[index] = +user));
  const chat = await prisma.createChat(usersArray);
  if (!chat) {
    return next(new Sperror('Server Error', 'Error when creating chat.', 500));
  }
  res.status(201).json({ chat });
};

const putChat = async (req, res, next) => {
  const usersArray = JSON.parse(req.body.users);
  if (!Array.isArray(usersArray)) {
    return next(
      new Sperror(
        'Bad Request',
        'No user list provided for chat creation.',
        400
      )
    );
  }
  usersArray.forEach((user, index) => (usersArray[index] = +user));
  const chatId = +req.params.chatId;
  const updatedChat = await prisma.updateChat(chatId, usersArray);
  if (!updatedChat) {
    return next(new Sperror('Server Error', 'Error when updating chat.', 500));
  }
  res.json({ chat: updatedChat });
};

module.exports = { getChats, postChat, putChat };
