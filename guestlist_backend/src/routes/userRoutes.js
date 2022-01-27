import express from "express";
import * as userController from "../controller/userController";
import { getEventsOf } from "../controller/eventController";

export const userRouter = express.Router();

userRouter
  .route("/:userId")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

userRouter.route("/:userId/events").get(getEventsOf);
