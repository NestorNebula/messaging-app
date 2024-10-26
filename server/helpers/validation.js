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
    .isEmail()
    .withMessage("Email isn't a valid email.")
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

const validateUpdateUser = [
  body('username')
    .trim()
    .blacklist('<>')
    .notEmpty()
    .custom(async (username, { req }) => {
      const existingUser = await prisma.getUserByUsername(username);
      if (existingUser && req.user.id !== existingUser.id)
        throw new Error('Username already taken.');
    }),
  body('email')
    .trim()
    .blacklist('<>')
    .notEmpty()
    .isEmail()
    .withMessage("Email isn't a valid email.")
    .custom(async (email, { req }) => {
      const existingUser = await prisma.getUserByEmail(email);
      if (existingUser && req.user.id !== existingEmail.id)
        throw new Error('Email already taken.');
    }),
  body('password')
    .trim()
    .optional()
    .isLength({ min: 8, max: 30 })
    .withMessage('Username must have between 8 and 30 characters.'),
];

module.exports = { validateUser, validateUpdateUser };
