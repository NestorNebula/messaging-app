const { request, app } = require('./setup');
const router = require('../routes/user');
const { getFakeUser, getFakeFriend } = require('../helpers/faker');

const user = getFakeUser();
const mockUser = user;
const friends = [getFakeFriend(), getFakeFriend(), getFakeFriend()];
const mockNewFriend = getFakeFriend();
const mockFriends = friends;

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
    getUserFriends: () => {
      return mockFriends;
    },
    updateUser: (id, newUser) => {
      return {
        id: id,
        username: newUser.username,
        email: newUser.email,
        password: newUser.password || mockUser.password,
      };
    },
    updateUserStatus: (id, status) => {
      const user = mockUser.id === id ? mockUser : null;
      if (!user) return null;
      user.online = status;
      return user;
    },
    connectUserFriend: (id, friendId) => {
      const friends = [...mockFriends];
      if (friendId === mockNewFriend.id) {
        friends.push(mockNewFriend);
      }
      return friends;
    },
    disconnectUserFriend: (id, friendId) => {
      const friends = mockFriends.filter((friend) => friend.id !== friendId);
      return friends;
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
      .send({ username: 'new', email: 'email@email' })
      .type('form')
      .expect(400, done);
  });
});

describe('PUT user status', () => {
  it('returns 200 after updating status', (done) => {
    request(app)
      .put(`/${user.id}/status`)
      .send({ online: true })
      .expect(200, done);
  });
});

describe('GET user friends', () => {
  it('returns user friends', () => {
    return request(app)
      .get(`/${user.id}/friends`)
      .then((res) => {
        expect(res.body.friends).toEqual(friends);
      });
  });

  it("returns 403 when trying to access other user's friends", (done) => {
    request(app)
      .get(`/${user.id + 1}/friends`)
      .expect(403, done);
  });
});

describe('PUT user friends', () => {
  it('returns updated friendlist after adding friend', () => {
    return request(app)
      .put(`/${user.id}/friends`)
      .send({ type: 'add', friendId: mockNewFriend.id })
      .type('form')
      .then((res) => {
        const friendsCount = res.body.friends.length;
        expect(friendsCount).toBe(mockFriends.length + 1);
        expect(res.body.friends[friendsCount - 1]).toEqual(mockNewFriend);
      });
  });

  it('returns updated friendlist after removing friend', () => {
    return request(app)
      .put(`/${user.id}/friends`)
      .send({ type: 'remove', friendId: mockFriends[2].id })
      .type('form')
      .then((res) => {
        expect(res.body.friends.length).toBe(mockFriends.length - 1);
        expect(
          res.body.friends.find((friend) => friend.id === mockFriends[2].id)
        ).toBeUndefined();
      });
  });

  it("returns 403 when trying to update another user's friends", (done) => {
    request(app)
      .put(`/${user.id + 1}/friends`)
      .send({ type: 'remove', friendId: user.id })
      .type('form')
      .expect(403, done);
  });
});
