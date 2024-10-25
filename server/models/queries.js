const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// User queries

const getUser = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      email: true,
    },
  });
  return user;
};

const getUserByUsername = async (username) => {
  const user = await prisma.user.findFirst({
    where: { username },
  });
  return user;
};

const getUserByEmail = async (email) => {
  const user = await prisma.user.findFirst({
    where: { email },
  });
  return user;
};

const getUserByUsermail = async (username) => {
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ username }, { email: username }],
    },
  });
  return user;
};

const createUser = async ({ username, email, password, avatar }) => {
  const user = await prisma.user.create({
    data: {
      username,
      email,
      password,
      profile: {
        create: {
          displayName: username,
          avatar,
        },
      },
    },
  });
  return user;
};

// Profile queries

// Message queries

// Chat queries

module.exports = {
  getUser,
  getUserByUsername,
  getUserByEmail,
  getUserByUsermail,
  createUser,
};
