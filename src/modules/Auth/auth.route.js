import express from 'express';
import checkToken from '../../middlewares/token.middleware';
import authController from './auth.controller';
import validateFormRegister from './auth.validate';
const AuthRouter = express.Router();

AuthRouter.route('/my-profile').get(checkToken, authController.getMe);
AuthRouter.route('/login').post(authController.login);
AuthRouter.route('/register').post(validateFormRegister, authController.register);
export default AuthRouter;
