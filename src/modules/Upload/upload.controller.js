import Result from '../../helpers/result.helper';

const upload = async (req, res, next) => {
  try {
    const path = `http://localhost:8000/${req.file.path.split('/').splice(2).join('/')}`;
    Result.success(res, { path }, 201);
  } catch (error) {
    next(error);
  }
};

const uploadController = { upload };
export default uploadController;
