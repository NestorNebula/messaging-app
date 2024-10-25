const { body } = require('express-validator');
const prisma = require('../models/queries');

const validateUser = [
  body('username')
    .trim()
    .blacklist('<>')
    .custom(async (username) => {
      const existingUser = await prisma.getUserByUsername(username);
      if (existingUser) throw new Error('Username already taken.');
    }),
  body('email')
    .trim()
    .blacklist('<>')
    .custom(async (email) => {
      const existingEmail = await prisma.getUserByEmail(email);
      if (existingEmail) throw new Error('Email already taken.');
    }),
];

module.exports = { validateUser };
