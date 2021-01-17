import express from 'express';
import authController from './auth.controller';
import validateFormRegister from './auth.validate';
const AuthRouter = express.Router();

AuthRouter.route('/login').post(authController.login);
AuthRouter.route('/register').post(validateFormRegister, authController.register);

export default AuthRouter;
