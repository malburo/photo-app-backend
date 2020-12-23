import express from "express";
import authController from "./auth.controller";
const AuthRouter = express.Router();

AuthRouter.route("/login").post(authController.login);
AuthRouter.route("/register").post(authController.register);

export default AuthRouter;
