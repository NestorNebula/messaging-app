const jwt = require('jsonwebtoken');
require('dotenv').config();

const getToken = (user) => {
  const token = jwt.sign(user, process.env.AT, { expiresIn: '15m' });
  return token;
};

const getRefreshToken = (user) => {
  const token = jwt.sign(user, process.env.RT, { expiresIn: '7d' });
  return token;
};

const verifyRefreshToken = (token) => {
  try {
    const { id } = jwt.verify(token, process.env.RT);
    return id;
  } catch {
    return false;
  }
};

module.exports = { getToken, getRefreshToken, verifyRefreshToken };
