import bcrypt from 'bcrypt';
import Result from 'helpers/result.helper';
import { createAccessToken } from 'helpers/token.helper';
import User from '../User/user.model';

const getMe = async (req, res, next) => {
  try {
    Result.success(res, { currentUser: req.user }, 201);
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    console.log(req.body);
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
    const currentUser = {
      fullname: user.fullname,
      email: user.email,
      profilePictureUrl: user.profilePictureUrl,
    };
    Result.success(res, { access_token, currentUser }, 201);
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
      profilePictureUrl: `https://avatars.dicebear.com/4.5/api/initials/${fullname}.svg`,
    });
    const access_token = createAccessToken(newUser);
    const currentUser = {
      fullname: newUser.fullname,
      email: newUser.email,
      profilePictureUrl: newUser.profilePictureUrl,
    };
    Result.success(res, { access_token, currentUser }, 201);
  } catch (error) {
    return next(error);
  }
};

const authController = { login, register, getMe };
export default authController;
