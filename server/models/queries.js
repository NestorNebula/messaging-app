const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// User queries

const getUser = async (id) => {
  const user = await prisma.user.findUnique({
    select: {
      id: true,
      username: true,
      email: true,
    },
  });
  return user;
};

// Profile queries

// Message queries

// Chat queries

module.exports = { getUser };
