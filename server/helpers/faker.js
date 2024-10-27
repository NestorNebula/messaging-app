const { faker } = require('@faker-js/faker');

const getFakeUser = () => {
  const name = faker.person.firstName();
  return {
    id: faker.number.int({ max: 100 }),
    username: name,
    email: faker.internet.email({ firstName: name }),
    password: faker.internet.password({ length: 10, memorable: true }),
  };
};

const getFakeProfile = (
  userId = faker.number.int({ max: 100 }),
  name = faker.person.firstName()
) => {
  return {
    displayName: name,
    avatar: null,
    bio: faker.person.bio(),
    link: faker.internet.url(),
    userId,
  };
};

const getFakeFriend = () => {
  return getFakeUser();
};

const getFakeChat = (user) => {
  return {
    id: faker.number.int({ max: 1000 }),
    creationDate: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
    users: user ? [user, getFakeUser()] : [getFakeUser(), getFakeUser()],
  };
};

module.exports = { getFakeUser, getFakeProfile, getFakeFriend, getFakeChat };
