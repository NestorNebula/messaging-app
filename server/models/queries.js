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

const getUserInformations = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
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

const getUserFriends = async (userId) => {
  const friends = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      friends: true,
    },
  });
  return friends;
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

const updateUser = async (id, { username, email, password }) => {
  const user = await prisma.user.update({
    where: { id },
    data: {
      username,
      email,
      password,
    },
  });
  return user;
};

// Profile queries

const getProfile = async (userId) => {
  const profile = await prisma.profile.findUnique({
    where: { userId },
  });
  return profile;
};

const getAllProfiles = async ({ userId, limit }) => {
  const profiles = await prisma.profile.findMany({
    where: {
      NOT: {
        user: {
          id: userId,
        },
      },
    },
    orderBy: {
      user: {
        followers: {
          _count: 'desc',
        },
      },
    },
    take: limit,
  });
  return profiles;
};

const updateProfile = async (userId, { displayName, avatar, bio, link }) => {
  const profile = await prisma.profile.update({
    where: {
      userId,
    },
    data: { displayName, avatar, bio, link },
  });
  return profile;
};

// Message queries

// Chat queries

module.exports = {
  getUser,
  getUserInformations,
  getUserByUsername,
  getUserByEmail,
  getUserByUsermail,
  getUserFriends,
  createUser,
  updateUser,
  getProfile,
  getAllProfiles,
  updateProfile,
};
