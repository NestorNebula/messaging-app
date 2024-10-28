const prisma = require('../models/queries');
const Sperror = require('sperror');
const { uploadFile } = require('../helpers/upload');

const postMessage = async (req, res, next) => {
  const result = req.body.hasFile ? await uploadFile(req, res) : null;
  if (!result && !req.body.content) {
    return next(
      new Sperror('No content', 'The message must have content or file.', 400)
    );
  }
  const chatId = +req.params.chatId;
  const userChats = await prisma.getUserChats(req.user.id);
  if (!userChats.some((chat) => chat.id === chatId)) {
    return next(
      new Sperror(
        "Can't send message",
        'You cannot send a message in this group chat.',
        400
      )
    );
  }
  const message = await prisma.createMessage({
    chatId,
    userId: req.user.id,
    content: req.body.content || null,
    file: result || null,
  });
  res.status(201).json({ message });
};

const putMessage = () => {};

const deleteMessage = () => {};

module.exports = { postMessage, putMessage, deleteMessage };
