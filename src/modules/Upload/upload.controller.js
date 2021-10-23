import Result from 'helpers/result.helper';
import cloudinary from 'cloudinary';
const fs = require('fs');

const upload = async (req, res, next) => {
  try {
    if (!req.file) {
      return Result.error(res, { message: 'File is empty' }, 401);
    }
    if (req.file.mimetype === 'image/jpg' || req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/png') {
      const uploader = await cloudinary.v2.uploader.upload(req.file.path, { resource_type: 'auto' });
      fs.unlinkSync(req.file.path);
      Result.success(res, { uploader }, 201);
    } else return Result.error(res, { message: 'Type file does not support' }, 401);
  } catch (error) {
    next(error);
  }
};

const uploadController = { upload };
export default uploadController;
