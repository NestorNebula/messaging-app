const { request, app } = require('./setup');
const router = require('../routes/message');
const chatRouter = require('../routes/chat');
const {
  getFakeUser,
  getFakeChat,
  getFakeMessage,
} = require('../helpers/faker');

const user = getFakeUser();
const chat = getFakeChat(user);
const mockChats = [chat, getFakeChat(), getFakeChat()];
const mockRandomMessage = getFakeMessage;
app.use('/', (req, res, next) => {
  req.user = user;
  next();
});

jest.mock('../models/queries', () => {
  return {
    getUserChats: (userId) => {
      return mockChats.filter((chat) =>
        chat.users.some((user) => user.id === userId)
      );
    },
    createMessage: ({ chatId, userId, content, file }) => {
      return mockRandomMessage({ content, file, userId, chatId });
    },
  };
});

describe.skip('POST message', () => {
  it('returns created message', () => {
    app.use('/', chatRouter);
    return request(app)
      .post(`/${chat.id}/messages`)
      .send({ content: 'This is my message.' })
      .type('form')
      .expect(201)
      .then((res) => {
        expect(res.body.message.chatId).toBe(chat.id);
        expect(res.body.message.userId).toBe(user.id);
        expect(res.body.message.content).toBe('This is my message.');
      });
  });

  it('returns 400 if no content/file is provided', (done) => {
    app.use('/', chatRouter);
    request(app)
      .post(`/${chat.id}/messages`)
      .send({})
      .type('form')
      .expect(400, done);
  });
});
