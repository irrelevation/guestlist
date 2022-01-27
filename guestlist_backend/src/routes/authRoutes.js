import { Router } from "express";
import * as authController from "../controller/authController";
import { googleAuth, facebookAuth } from "../middleware/authMiddleware";

export const authRouter = Router();

authRouter.route("/signUp").post(authController.signUp);

authRouter.route("/login/password").post(authController.loginWithEmailAndPassword);
authRouter.route("/login/google").get(googleAuth);
authRouter.route("/login/facebook").get(facebookAuth);

authRouter.route("/redirect/google").get(googleAuth, authController.loginWithGoogle);
