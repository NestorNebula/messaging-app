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
app.use('/:userId', userRouter);
app.use('/', router);

describe('GET profile', () => {
  it('returns own requested profile', () => {
    return request(app)
      .get(`/${user.id}/profile`)
      .then((res) => {
        expect(res.body.profile).toEqual(mockProfiles[2]);
      });
  });

  it('returns other user profile', () => {
    return request(app)
      .get(`/${mockProfiles[0].userId}`)
      .then((res) => {
        expect(res.body.profile).toEqual(mockProfiles[0]);
      });
  });

  it("returns 404 when profile doesn't exist", (done) => {
    return request(app)
      .get(`/${mockProfiles[1].userId + 100}`)
      .expect(404, done);
  });
});
