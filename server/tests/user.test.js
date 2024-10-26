const { request, app } = require('./setup');
const router = require('../routes/user');
const { getFakeUser } = require('../helpers/faker');

const user = getFakeUser();
const mockUser = user;

app.use('/', (req, res, next) => {
  req.user = user;
  next();
});
app.use('/', router);

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
      .then((res) => {
        expect(res.body.user).toEqual(user);
      });
  });

  it('returns 403 when trying to get another user', (done) => {
    request(app)
      .get(`/${user.id + 1}`)
      .expect(403, done);
  });
});
