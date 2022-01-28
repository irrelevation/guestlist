import express from "express";
import * as eventController from "../controller/eventController";
import { jwtAuth } from "../middleware/authMiddleware";

export const eventRouter = express.Router();

eventRouter.use(jwtAuth);

eventRouter.route("/").post(eventController.createEvent);

eventRouter
  .route("/:eventId")
  .get(eventController.getEvent)
  .patch(eventController.updateEvent)
  .delete(eventController.deleteEvent);

eventRouter.route("/:eventId/guests").get(eventController.getAllGuests).post(eventController.addGuests);

eventRouter
  .route("/:eventId/guests/:guest")
  .patch(eventController.updateGuest)
  .get(eventController.getGuest)
  .delete(eventController.deleteGuest);
