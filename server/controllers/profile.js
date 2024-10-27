const prisma = require('../models/queries');
const Sperror = require('sperror');
const { validationResult } = require('express-validator');
const { validateProfile } = require('../helpers/validation');

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
  if (!profiles) {
    return next(
      new Sperror('Server Error', 'Error when fetching profiles.', 500)
    );
  }
  res.json({ profiles });
};

const putProfile = [
  validateProfile,
  async (req, res, next) => {
    const userIdProfileToUpdate = +req.params.userId;
    if (req.user.id !== userIdProfileToUpdate) {
      return next(new Sperror('Forbidden', "You can't update this data.", 403));
    }
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    const updatedProfile = await prisma.updateProfile(userIdProfileToUpdate, {
      displayName: req.body.displayName,
      avatar: req.body.avatar,
      bio: req.body.bio,
      link: req.body.link,
    });
    if (!updatedProfile) {
      return next(
        new Sperror('Server Error', 'Error when updating profile.', 500)
      );
    }
    res.json({ profile: updatedProfile });
  },
];

module.exports = { getProfile, getProfiles, putProfile };
