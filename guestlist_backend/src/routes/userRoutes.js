import express from "express";
import * as userController from "../controller/userController";

export const userRouter = express();

userRouter.route("/").post(userController.createUser);

userRouter
  .route("/:userId")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

userRouter.route("/:userId/events").get(userController.getEventsOfUser);
