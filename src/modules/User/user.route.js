import { Router } from 'express';
import checkToken from 'middlewares/token.middleware';
import userController from './user.controller';
const UserRouter = Router();

UserRouter.route('/:userId')
  .get(userController.getUser)
  .put(checkToken, userController.updateInfo)
  .delete(checkToken, userController.deleteUser);
UserRouter.route('/:userId/change-password').put(checkToken, userController.updatePassword);
UserRouter.route('/:userId/change-avatar').put(checkToken, userController.updateAvatar);
UserRouter.route('/:userId/photos').get(userController.getPhotoOfUser);
export default UserRouter;
