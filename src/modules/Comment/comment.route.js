import { Router } from 'express';
import commentController from './comment.controller';

const CommentRouter = Router();
CommentRouter.route('/photos/:photoId').get(commentController.getByPhotoId).post(commentController.createComment);

export default CommentRouter;
