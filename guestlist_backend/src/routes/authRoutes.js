import { Router } from "express";
import * as authController from "../controller/authController";

export const authRouter = Router();

authRouter.route("/signUp").post(authController.signUp);

authRouter.route("/login/password").post(authController.loginWithEmailAndPassword);
