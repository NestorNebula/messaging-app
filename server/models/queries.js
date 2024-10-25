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

// Profile queries

// Message queries

// Chat queries

module.exports = { getUser, getUserByUsername, getUserByEmail };
