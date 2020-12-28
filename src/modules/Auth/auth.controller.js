import bcrypt from 'bcrypt';
import Result from '../../helpers/result.helper';
import { createAccessToken } from '../../helpers/token.helper';
import User from '../User/user.model';

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return Result.error(res, { message: 'email does not exist' }, 401);
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return Result.error(res, { message: 'Wrong password' }, 401);
    }
    const access_token = createAccessToken(user);
    Result.success(res, { access_token }, 201);
  } catch (error) {
    return next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { fullname, email, password } = req.body;
    const checkEmail = await User.find({ email }).countDocuments();
    if (checkEmail) {
      return Result.error(res, { message: 'Email này đã được sử dụng' });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({
      fullname,
      email,
      password: hashedPassword,
    });
    const access_token = createAccessToken(newUser);
    Result.success(res, { access_token }, 201);
  } catch (error) {
    return next(error);
  }
};

const authController = { login, register };
export default authController;
