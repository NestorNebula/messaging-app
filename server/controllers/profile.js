const prisma = require('../models/queries');
const Sperror = require('sperror');

const getProfile = async (req, res, next) => {
  const profile = await prisma.getProfile(+req.params.userId);
  if (!profile) {
    return next(new Sperror('Not Found', "Profile couldn't be found.", 404));
  }
  res.json({ profile });
};

const getProfiles = async (req, res, next) => {
  const profiles = await prisma.getAllProfiles({
    userId: req.user.id,
    limit: 100,
  });
  if (!profiles.length) {
    return next(new Sperror('Not Found', "Couldn't find any profile.", 404));
  }
  res.json({ profiles });
};

const putProfile = () => {};

module.exports = { getProfile, getProfiles, putProfile };
