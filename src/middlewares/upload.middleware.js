import Result from '../helpers/result.helper';

const uploadMiddleware = (req, res, next) => {
  try {
    if (!req.file && !req.files) {
      return Result.error(res, { message: 'File is empty' }, 401);
    }
    next();
  } catch (err) {
    return next(err);
  }
};

export default uploadMiddleware;
