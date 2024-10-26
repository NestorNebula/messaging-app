const { request, app } = require('./setup');
const router = require('../routes/message');
const chatRouter = require('../routes/chat');
const { getFakeUser } = require('../helpers/faker');

const user = getFakeUser();
app.use('/', (req, res, next) => {
  req.user = user;
  next();
});

describe.skip('POST message', () => {
  app.use('/', chatRouter);
  it("doesn't do anything for now", () => {});
});
