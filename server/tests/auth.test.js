const { request, app } = require('./setup');
const router = require('../routes/auth');
const { getFakeUser } = require('../helpers/faker');

app.use('/', router);

jest.mock('../models/queries', () => {
  return {
    createUser: (user) => {
      return user;
    },
  };
});

describe('POST signup', () => {
  it('returns 201 code after creating user', (done) => {
    const user = getFakeUser();
    request(app)
      .post('/signup')
      .send({
        username: user.username,
        email: user.email,
        password: user.password,
      })
      .type('form')
      .expect(201, done);
  });
});
