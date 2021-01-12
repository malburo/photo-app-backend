import jwt from 'jsonwebtoken';
import Result from '../helpers/result.helper';
import User from '../modules/User/user.model';

const checkToken = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return Result.error(res, { message: 'No token provided' }, 403);
    }
    token = token.split(' ')[1];
    const decode = await jwt.verify(token, process.env.SECRET);
    const user = await User.findById(decode.id);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
export default checkToken;
