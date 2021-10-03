import Result from '../../helpers/result.helper';
import cloudinary from '../../config/cloudinary.config';
const fs = require('fs');

const upload = async (req, res, next) => {
  try {
    const uploader = await cloudinary.uploads(req.file.path, 'PhotoApp/image');
    fs.unlinkSync(req.file.path);
    Result.success(res, { uploader }, 201);
  } catch (error) {
    next(error);
  }
};

const uploadController = { upload };
export default uploadController;
