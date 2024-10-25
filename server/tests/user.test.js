const { request, app } = require('./setup');
const router = require('../routes/user');
const { getFakeUser } = require('../helpers/faker');

app.use('/', router);

const user = getFakeUser();
const mockUser = user;

jest.mock('../models/queries', () => {
  return {
    getUser: () => {
      return mockUser;
    },
  };
});

describe('GET user', () => {
  it('returns user', () => {
    return request(app)
      .get(`/${user.id}`)
      .send({ user })
      .then((res) => {
        expect(res.body.user).toEqual(user);
      });
  });

  it('returns 403 when trying to get another user', (done) => {
    request(app)
      .get(`/${user.id + 1}`)
      .send({ user })
      .expect(403, done);
  });
});
