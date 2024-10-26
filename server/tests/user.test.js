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
    getUserInformations: () => {
      return mockUser;
    },
    getUserByUsername: (username) => {
      return username === mockUser.username ? mockUser : null;
    },
    getUserByEmail: (email) => {
      return email === mockUser.email ? mockUser : null;
    },
    updateUser: (id, newUser) => {
      return {
        id: id,
        username: newUser.username,
        email: newUser.email,
        password: newUser.password || mockUser.password,
      };
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

describe('PUT user', () => {
  it('returns updated user', () => {
    return request(app)
      .put(`/${user.id}`)
      .send({ username: user.username, email: 'mynew@email.com' })
      .type('form')
      .then((res) => {
        expect(res.body.user.username).toBe(user.username);
        expect(res.body.user.email).toBe('mynew@email.com');
      });
  });

  it('returns 403 when trying to update another user', (done) => {
    request(app)
      .put(`/${user.id + 1}`)
      .send({ username: user.username, email: 'mynewemail.com' })
      .type('form')
      .expect(403, done);
  });

  it('returns 400 when incorrect data is provided', (done) => {
    request(app)
      .put(`/${user.id}`)
      .send({ username: 'new', email: user.email })
      .type('form')
      .expect(400, done);
  });
});
