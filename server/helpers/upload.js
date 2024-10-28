const cloudinary = require('./cloudinary');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const uploadMiddleware = upload.single('image');

const runMiddleware = (req, res, middleware) => {
  return new Promise((resolve, reject) => {
    middleware(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

const uploadFile = async (req, res) => {
  try {
    await runMiddleware(req, res, uploadMiddleware);
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    let dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;
    const result = await cloudinary.uploader.upload(dataURI, {
      public_id: `${req.file.originalname.split('.')[0]}${req.user.id}${
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
