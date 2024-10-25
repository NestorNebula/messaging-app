const { request, app } = require('./setup');
const router = require('../routes/auth');
const { getFakeUser } = require('../helpers/faker');
const bcrypt = require('bcrypt');

app.use('/', router);

const user = getFakeUser();
const mockUser = user;
const mockHash = bcrypt.hashSync(user.password, 10);

jest.mock('../models/queries', () => {
  return {
    createUser: (user) => {
      return user;
    },
    getUserByUsername: () => {
      return null;
    },
    getUserByEmail: () => {
      return null;
    },
    getUserByUsermail: () => {
      return {
        ...mockUser,
        password: mockHash,
      };
    },
  };
});

describe('POST signup', () => {
  it('returns 201 code after creating user', (done) => {
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

  it("returns 400 code when data aren't correct", (done) => {
    request(app)
      .post('/signup')
      .send({ username: 'username', email: 'email@email.com', password: 'pwd' })
      .type('form')
      .expect(400, done);
  });
});

describe('POST login', () => {
  it('returns cookies when logging in', () => {
    return request(app)
      .post('/login')
      .send({ username: user.username, password: user.password })
      .type('form')
      .expect(200)
      .then((res) => {
        expect(res.headers['set-cookie'][1]).not.toBeNull();
      });
  });

  it('returns error when users informations are invalid', () => {
    return request(app)
      .post('/login')
      .send({ username: user.username, password: mockHash })
      .type('form')
      .then((res) => {
        expect(res.statusCode).toBe(400);
      });
  });
});
