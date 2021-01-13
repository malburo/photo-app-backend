import Result from '../../helpers/result.helper';
import Comment from '../Comment/comment.model';

const getByPhotoId = async (req, res, next) => {
  try {
    const { photoId } = req.params;
    const commentList = await Comment.find({ photoId }).populate({
      path: 'userId',
      select: '_id profilePictureUrl fullname',
    });
    return Result.success(res, { commentList });
  } catch (error) {
    next(error);
  }
};

const createComment = async (req, res, next) => {
  try {
    const { photoId } = req.params;
    const { content } = req.body;
    const newComment = await Comment.create({
      photoId,
      content,
      userId: req.user.id,
    });
    const data = await Comment.findOne({ _id: newComment._id })
      .populate({
        path: 'userId',
        select: '_id profilePictureUrl fullname',
      })
      .populate('photoId');
    return Result.success(res, { newComment: data });
  } catch (error) {
    next(error);
  }
};

const commentController = { createComment, getByPhotoId };
export default commentController;
