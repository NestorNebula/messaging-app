import { faker } from '@faker-js/faker';

const getFakeUser = (id = faker.number.int({ max: 100 }), profile) => {
  const name = faker.person.firstName();
  return {
    id,
    username: name,
    email: faker.internet.email({ firstName: name }),
    profile: profile ? getFakeProfile(id, name) : null,
  };
};

const getFakeProfile = (
  id = faker.number.int({ max: 100 }),
  name = faker.person.firstName()
) => {
  return {
    displayName: name,
    avatar: 'default.png',
    bio: faker.lorem.paragraph(),
    link: faker.internet.url(),
    userId: id,
    user: {
      username: name,
    },
  };
};

const getFakeChats = (userId) => {
  return [getFakeChat(userId), getFakeChat(userId), getFakeChat(userId)];
};

const getFakeChat = (userId) => {
  const secondUserId = faker.number.int({ max: 100 });
  const chatId = faker.number.int({ max: 1000 });
  return {
    id: chatId,
    creationDate: faker.date.past({ years: 1 }),
    updatedAt: faker.date.recent(),
    users: [getFakeUser(userId, true), getFakeUser(secondUserId, true)],
    messages: [getFakeMessage(userId, chatId), getFakeMessage(userId, chatId)],
  };
};

const getFakeMessage = (userId, chatId, file) => {
  return {
    id: faker.number.int({ max: 10000 }),
    content: faker.lorem.paragraph(),
    file: file ? 'default.png' : null,
    creationDate: faker.date.recent(),
    userId,
    chatId,
  };
};

const getFakeFriends = () => {
  return [
    getFakeUser(undefined, true),
    getFakeUser(undefined, true),
    getFakeUser(undefined, true),
  ];
};

export { getFakeUser, getFakeProfile, getFakeChats, getFakeFriends };
