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
const message = getFakeMessage({
  content: 'This is a fake message.',
  file: null,
  userId: user.id,
  chatId: chat.id,
});
const mockRandomMessage = getFakeMessage;
const mockMessages = [message, getFakeMessage({}), getFakeMessage({})];
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
    getMessage: (id) => {
      return mockMessages.find((msg) => msg && msg.id === id);
    },
    updateMessage: (id, content) => {
      const msg = mockMessages.find((msg) => msg.id === id);
      msg.content = content;
      return msg;
    },
    deleteMessage: (id) => {
      const msgIndex = mockMessages.findIndex((msg) => msg && msg.id === id);
      delete mockMessages[msgIndex];
    },
  };
});

describe('POST message', () => {
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

describe('PUT message', () => {
  app.use('/', router);
  it('returns updated message', () => {
    return request(app)
      .put(`/${message.id}`)
      .send({ content: 'Content updated.' })
      .type('form')
      .then((res) => {
        expect(Date(res.body.message.creationDate).toString()).toBe(
          message.creationDate.toString()
        );
        expect(res.body.message.content).toBe('Content updated.');
      });
  });

  it("returns 403 when trying to edit someone else's message", (done) => {
    request(app)
      .put(`/${mockMessages[2].id}`)
      .send({ content: "Trying to update someone else's message." })
      .type('form')
      .expect(403, done);
  });
});

describe('DELETE message', () => {
  app.use('/', router);
  it('deletes correct message', () => {
    return request(app)
      .delete(`/${message.id}`)
      .expect(200)
      .then(() => {
        expect(mockMessages[0]).toBeUndefined();
      });
  });

  it("returns 403 when trying to delete someone else's message", (done) => {
    request(app).delete(`/${mockMessages[1].id}`).expect(403, done);
  });
});
