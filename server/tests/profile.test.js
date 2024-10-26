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
    getAllProfiles: ({ userId, limit }) => {
      return mockProfiles.filter(
        (profile, index) => profile.userId !== userId && index < limit
      );
    },
    updateProfile: (userId, updateProfile) => {
      const profileToUpdate = mockProfiles.find(
        (profile) => profile.userId === userId
      );
      if (!profileToUpdate) return false;
      profileToUpdate.displayName = updateProfile.displayName;
      profileToUpdate.avatar = updateProfile.avatar;
      profileToUpdate.bio = updateProfile.bio;
      profileToUpdate.link = updateProfile.link;
      return profileToUpdate;
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

describe('GET profiles', () => {
  app.use('/', router);
  it('returns all profiles without the user profile itself', () => {
    return request(app)
      .get('/')
      .then((res) => {
        expect(res.body.profiles.length).toBe(2);
      });
  });
});

describe('PUT profile', () => {
  app.use('/', userRouter);
  it('returns updated profile after successful update', () => {
    return request(app)
      .put(`/${user.id}/profile`)
      .send({
        displayName: mockProfiles[2].displayName,
        avatar: mockProfiles[2].avatar,
        bio: 'This is a new bio.',
        link: mockProfiles[2].link,
      })
      .type('form')
      .then((res) => {
        expect(res.body.profile.displayName).toBe(mockProfiles[2].displayName);
        expect(res.body.profile.bio).toBe('This is a new bio.');
      });
  });

  it('returns 403 when trying to update other user profile', (done) => {
    request(app)
      .put(`/${mockProfiles[0].userId}/profile`)
      .send({
        displayName: mockProfiles[2].displayName,
        avatar: mockProfiles[2].avatar,
        bio: 'This is a new bio.',
        link: mockProfiles[2].link,
      })
      .type('form')
      .expect(403, done);
  });

  it('returns 400 when provided data is invalid', (done) => {
    request(app)
      .put(`/${user.id}/profile`)
      .send({
        displayName: 'mockProfiles[2].displayName.false',
        avatar: mockProfiles[2].avatar,
        bio: 'This is a new bio.',
        link: mockProfiles[2].link,
      })
      .type('form')
      .expect(400, done);
  });
});
