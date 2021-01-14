import { Router } from 'express';
import checkToken from '../../middlewares/token.middleware';
import commentController from './comment.controller';

const CommentRouter = Router();
CommentRouter.route('/photos/:photoId')
  .get(commentController.getByPhotoId)
  .post(checkToken, commentController.createComment);

export default CommentRouter;
