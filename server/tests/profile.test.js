const { request, app } = require('./setup');
const router = require('../routes/profile');
const userRouter = require('../routes/user');
const { getFakeUser, getFakeProfile } = require('../helpers/faker');

const user = getFakeUser();
const mockUser = user;
const mockProfiles = [
  getFakeProfile(),
  getFakeProfile(),
  getFakeProfile(mockUser.id, mockUser.username),
];

app.use('/', (req, res, next) => {
  req.user = user;
  next();
});

jest.mock('../models/queries', () => {
  return {
    getProfile: (userId) => {
      return mockProfiles.find((profile) => profile.userId === userId);
    },
  };
});

describe('GET profile', () => {
  app.use('/', userRouter);
  it('returns own requested profile', () => {
    return request(app)
      .get(`/${user.id}/profile`)
      .then((res) => {
        expect(res.body.profile).toEqual(mockProfiles[2]);
      });
  });

  it('returns other user profile', () => {
    return request(app)
      .get(`/${mockProfiles[0].userId}/profile`)
      .then((res) => {
        expect(res.body.profile).toEqual(mockProfiles[0]);
      });
  });

  it("returns 404 when profile doesn't exist", (done) => {
    request(app)
      .get(`/${mockProfiles[1].userId + 100}/profile`)
      .expect(404, done);
  });
});
