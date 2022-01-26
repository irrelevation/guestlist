import express from "express";
import * as userController from "../controller/userController";

export const userRouter = express.Router();

userRouter
  .route("/:userId")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);
