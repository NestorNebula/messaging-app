const { body } = require('express-validator');
const prisma = require('../models/queries');

const validateUser = [
  body('username')
    .trim()
    .blacklist('<>')
    .notEmpty()
    .custom(async (username) => {
      const existingUser = await prisma.getUserByUsername(username);
      if (existingUser) throw new Error('Username already taken.');
    }),
  body('email')
    .trim()
    .blacklist('<>')
    .notEmpty()
    .custom(async (email) => {
      const existingEmail = await prisma.getUserByEmail(email);
      if (existingEmail) throw new Error('Email already taken.');
    }),
  body('password')
    .trim()
    .notEmpty()
    .isLength({ min: 8, max: 30 })
    .withMessage('Username must have between 8 and 30 characters.'),
];

module.exports = { validateUser };
