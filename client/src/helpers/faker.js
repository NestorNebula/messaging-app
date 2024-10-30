import { faker } from '@faker-js/faker';

const getFakeUser = () => {
  const name = faker.person.firstName();
  return {
    id: faker.number.int({ max: 100 }),
    username: name,
    email: faker.internet.email({ firstName: name }),
  };
};

export { getFakeUser };
