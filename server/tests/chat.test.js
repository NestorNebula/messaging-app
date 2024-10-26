const { request, app } = require('./setup');
const router = require('../routes/chat');
const userRouter = require('../routes/user');
const { getFakeUser } = require('../helpers/faker');

const user = getFakeUser();
app.use('/', (req, res, next) => {
  req.user = user;
  next();
});

describe('GET chats', () => {
  app.use('/', userRouter);
  it("returns user's chats", () => {
    return request(app)
      .get(`/${user.id}/chats`)
      .then((res) => {
        // TODO: expect chats to match fakeChats
      });
  });
});
