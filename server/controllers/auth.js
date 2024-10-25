const { validationResult } = require('express-validator');
const { validateUser } = require('../helpers/validation');
const bcrypt = require('bcrypt');
const Sperror = require('sperror');
const prisma = require('../models/queries');

const signUp = [
  validateUser,
  (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) {
        throw new Sperror('Server error', 'Error during password hash.', 500);
      }
      const user = await prisma.createUser({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        avatar: 'default.png',
      });
      if (!user) {
        throw new Sperror('Server error', 'Error when creating user.', 500);
      }
      res.sendStatus(201);
    });
  },
];

const logIn = () => {};

const refresh = () => {};

module.exports = { signUp, logIn, refresh };
