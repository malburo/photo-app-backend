import checkToken from '../middlewares/token.middleware';
import AuthRouter from '../modules/Auth/auth.route';
import CommentRouter from '../modules/Comment/comment.route';
import PhotoRouter from '../modules/Photo/photo.route';
import UploadRouter from '../modules/Upload/upload.route';
import UserRouter from '../modules/User/user.route';

const MasterRouter = (app) => {
  app.use('/api/auth', AuthRouter);
  app.use('/api/photos', PhotoRouter);
  app.use('/api/comments', CommentRouter);
  app.use('/api/users', UserRouter);
  app.use('/api/upload', checkToken, UploadRouter);
};

export default MasterRouter;
