import Result from '../../helpers/result.helper';
import Photo from '../Photo/photo.model';

const getAll = async (req, res, next) => {
  try {
    const photos = await Photo.find({})
      .populate({
        path: 'userId',
        select: '_id profilePictureUrl fullname',
      })
      .sort({ _id: -1 });
    return Result.success(res, { photos });
  } catch (error) {
    next(error);
  }
};
const getAllOfCurrentUser = async (req, res, next) => {
  try {
    const photos = await Photo.find({ userId: req.user.id })
      .populate({
        path: 'userId',
        select: '_id profilePictureUrl fullname',
      })
      .sort({ _id: -1 });
    return Result.success(res, { photos });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { photoId } = req.params;
    const photo = await Photo.findById(photoId).populate({
      path: 'userId',
      select: '_id profilePictureUrl fullname',
    });
    return Result.success(res, { photo });
  } catch (error) {
    return Result.error(res, { message: 'Not Found' }, 404);
  }
};

const createPhoto = async (req, res, next) => {
  try {
    const { photoLabel, photoUrl } = req.body;
    const newPhoto = await Photo.create({
      photoLabel,
      photoUrl,
      userId: req.user.id,
    });
    delete req.user.password;
    newPhoto.userId = req.user;
    return Result.success(res, { newPhoto });
  } catch (error) {
    next(error);
  }
};
const updatePhoto = async (req, res, next) => {
  try {
    const { photoLabel } = req.body;
    const { photoId } = req.params;
    await Photo.updateOne({ _id: photoId }, { $set: { photoLabel } });
    const photoUpdated = await Photo.findById(photoId).populate({
      path: 'userId',
      select: '_id profilePictureUrl fullname',
    });
    return Result.success(res, { photoUpdated });
  } catch (error) {
    next(error);
  }
};
const deletePhoto = async (req, res, next) => {
  try {
    const { photoId } = req.params;
    const result = await Photo.findOneAndDelete({ userId: req.user._id, _id: photoId });
    if (result) {
      return Result.success(res, { message: 'Delete completed' });
    }
    return Result.error(res, { message: 'Delete invalid' });
  } catch (error) {
    next(error);
  }
};
const photoController = { getAll, getById, createPhoto, getAllOfCurrentUser, updatePhoto, deletePhoto };
export default photoController;
