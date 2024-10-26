const prisma = require('../models/queries');
const Sperror = require('sperror');

const getProfile = async (req, res, next) => {
  const profile = await prisma.getProfile(+req.params.userId);
  if (!profile) {
    return next(new Sperror('Not Found', "Profile couldn't be found.", 404));
  }
  res.json({ profile });
};

const getProfiles = () => {};

const putProfile = () => {};

module.exports = { getProfile, getProfiles, putProfile };
