const { request, app } = require('./setup');
const router = require('../routes/chat');
const userRouter = require('../routes/user');
const { getFakeUser, getFakeChat } = require('../helpers/faker');

const user = getFakeUser();
const mockUser = user;
const mockChats = [getFakeChat(user), getFakeChat(), getFakeChat()];

app.use('/', (req, res, next) => {
  req.user = user;
  next();
});

jest.mock('../models/queries', () => {
  return {
    getUserChats: () => {
      return mockChats.filter((chat) => {
        return chat.users.some((user) => user.id === mockUser.id);
      });
    },
  };
});

describe('GET chats', () => {
  app.use('/', userRouter);
  it("returns user's chats", () => {
    return request(app)
      .get(`/${user.id}/chats`)
      .then((res) => {
        expect(res.body.chats.length).toBe(1);
      });
  });

  it("returns 403 when trying to access other user's chats", (done) => {
    request(app).get(`/${mockChats[1].users[0].id}`).expect(403, done);
  });
});
