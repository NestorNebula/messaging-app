const prisma = require('../models/queries');
const Sperror = require('sperror');
const { uploadFile } = require('../helpers/upload');
const { validateMessage } = require('../helpers/validation');

const postMessage = [
  validateMessage,
  async (req, res, next) => {
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
      file: result ? result.secure_url : null,
    });
    res.status(201).json({ message });
  },
];

const putMessage = async (req, res, next) => {
  const message = await prisma.getMessage(+req.params.messageId);
  if (!message) {
    return next(
      new Sperror('Not Found', "The message couldn't be found.", 404)
    );
  }
  if (message.userId !== req.user.id) {
    return next(new Sperror('Forbidden', "You can't update this data.", 403));
  }
  const updatedMessage = await prisma.updateMessage(
    message.id,
    req.body.content
  );
  res.json({ message: updatedMessage });
};

const deleteMessage = async (req, res, next) => {
  const message = await prisma.getMessage(+req.params.messageId);
  if (!message) {
    return next(
      new Sperror(
        'Not Found',
        "The message you are trying to delete doesn't exist.",
        404
      )
    );
  }
  if (message.userId !== req.user.id) {
    return next(new Sperror('Forbidden', "You can't delete this data.", 403));
  }
  await prisma.deleteMessage(message.id);
  res.sendStatus(200);
};

module.exports = { postMessage, putMessage, deleteMessage };
