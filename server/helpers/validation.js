const { body } = require('express-validator');
const prisma = require('../models/queries');

const validateUser = [
  body('username')
    .trim()
    .blacklist('<>')
    .notEmpty()
    .isLength({ max: 30 })
    .withMessage('Username must a maximum of 30 characters.')
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
    .isLength({ min: 8 })
    .withMessage('Password must have at least 8 characters.'),
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
      if (existingUser && req.user.id !== existingUser.id)
        throw new Error('Email already taken.');
    }),
  body('password')
    .trim()
    .isLength({ min: 8 })
    .optional({ values: 'null' })
    .withMessage('Password must have at least 8 characters.'),
];

const validateProfile = [
  body('displayName')
    .trim()
    .escape()
    .notEmpty()
    .isLength({ max: 30 })
    .withMessage('Display name must have a maximum of 30 characters.'),
  body('avatar').trim().blacklist('<>'),
  body('bio').trim().escape(),
  body('link').trim().escape(),
];

const validateMessage = [body('content').trim().escape()];

module.exports = {
  validateUser,
  validateUpdateUser,
  validateProfile,
  validateMessage,
};
