import User from '../User/user.model';
import Photo from '../Photo/photo.model';
import bcrypt from 'bcrypt';
import Result from 'helpers/result.helper';

const getUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    Result.success(res, { user }, 201);
  } catch (error) {
    return next(error);
  }
};

const updateInfo = async (req, res, next) => {
  try {
    const { fullname, email, bio } = req.body;
    if (email === req.user.email) {
      await User.updateOne({ _id: req.user.id }, { $set: { fullname, bio } });
      const userUpdated = await User.findById(req.user.id);
      Result.success(res, { currentUser: userUpdated }, 201);
      return;
    }
    const checkEmail = await User.find({ email }).countDocuments();
    if (checkEmail) {
      return Result.error(res, { message: 'This email has been used' });
    }
    await User.updateOne({ _id: req.user.id }, { $set: { fullname, email, bio } });
    const userUpdated = await User.findById(req.user.id);
    Result.success(res, { currentUser: userUpdated }, 201);
  } catch (error) {
    return next(error);
  }
};
const updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const comparePassword = await bcrypt.compare(currentPassword, req.user.password);
    if (!comparePassword) {
      return Result.error(res, { message: 'Current password is wrong' }, 401);
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    await User.updateOne({ _id: req.user.id }, { $set: { password: hashedPassword } });
    Result.success(res, { status: 'Password updated successfully' }, 201);
  } catch (error) {
    return next(error);
  }
};

const updateAvatar = async (req, res, next) => {
  try {
    const { profilePictureUrl } = req.body;
    await User.updateOne({ _id: req.user.id }, { $set: { profilePictureUrl } });
    const userUpdated = await User.findById(req.user.id);
    Result.success(res, { currentUser: userUpdated }, 201);
  } catch (error) {
    return next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    Result.success(res, { user }, 201);
  } catch (error) {
    return next(error);
  }
};

const getPhotoOfUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const photos = await Photo.find({ userId })
      .populate({
        path: 'userId',
        select: '_id profilePictureUrl fullname',
      })
      .sort({ _id: -1 });
    return Result.success(res, { photos });
  } catch (error) {
    return Result.error(res, { message: 'Not Found' }, 404);
  }
};

const userController = { getUser, updateInfo, updatePassword, updateAvatar, getPhotoOfUser, deleteUser };
export default userController;
