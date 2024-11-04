const cloudinary = require('./cloudinary');

const uploadFile = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.body.image, {
      public_id: `${req.user.username.split('.')[0]}${req.user.id}${
        Math.random() * 1000000
      }`,
      overwrite: true,
    });
    return result || false;
  } catch {
    return false;
  }
};

module.exports = { uploadFile };
