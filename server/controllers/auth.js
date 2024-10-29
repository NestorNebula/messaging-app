const { validationResult } = require('express-validator');
const { validateUser } = require('../helpers/validation');
const bcrypt = require('bcrypt');
const Sperror = require('sperror');
const prisma = require('../models/queries');
const jwt = require('../helpers/jwt');

const signUp = [
  validateUser,
  (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) {
        return next(
          new Sperror('Server error', 'Error during password hash.', 500)
        );
      }
      const user = await prisma.createUser({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        avatar: 'default.png',
      });
      if (!user) {
        return next(
          new Sperror('Server error', 'Error when creating user.', 500)
        );
      }
      res.sendStatus(201);
    });
  },
];

const logIn = async (req, res, next) => {
  const user = await prisma.getUserByUsermail(req.body.username);
  if (!user)
    return next(
      new Sperror('User not found', 'Incorrect username/email.', 400)
    );
  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match)
    return next(new Sperror('Incorrect password', 'Incorrect password.', 400));
  const token = jwt.getToken({ id: user.id });
  const refreshToken = jwt.getRefreshToken({ id: user.id });
  const date = new Date(Date.now());
  date.setDate(date.getDate() + 7);
  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 900000,
    sameSite: 'none',
    secure: true,
  });
  res.cookie('refresh', refreshToken, {
    httpOnly: true,
    expires: date,
    sameSite: 'none',
    secure: true,
    path: '/auth',
  });
  res.json({ id: user.id });
};

const refresh = (req, res, next) => {
  const refreshToken = req.cookies['refresh'];
  if (!refreshToken)
    return next(
      new Sperror(
        'No refresh token',
        "Can't refresh token without refreshToken.",
        401
      )
    );
  const result = jwt.verifyRefreshToken(refreshToken);
  if (!result)
    return next(
      new Sperror(
        'Invalid refresh token',
        'The provided refresh token is invalid.',
        401
      )
    );
  const token = jwt.getToken({ id: result });
  res.cookie('token', token, {
    httpOnly: true,
    maxAge: 900000,
    sameSite: 'none',
    secure: true,
  });
  return res.json({ id: result });
};

module.exports = { signUp, logIn, refresh };
