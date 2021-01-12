import { Router } from 'express';
import userController from './user.controller';
const UserRouter = Router();

UserRouter.route('/me').get(userController.getMe).post(userController.updateInfo);
UserRouter.route('/me/password').post(userController.updatePassword);
UserRouter.route('/me/avatar').post(userController.updateAvatar);
export default UserRouter;
