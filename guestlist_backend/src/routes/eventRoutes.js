import express from "express";
import * as eventController from "../controller/eventController";

export const eventRouter = express.Router();

eventRouter.route("/").post(eventController.createEvent);

eventRouter
  .route("/:eventId")
  .get(eventController.getEvent)
  .patch(eventController.updateEvent)
  .delete(eventController.deleteEvent);

eventRouter.route("/:eventId/guests").get(eventController.getAllGuests).post(eventController.addGuest);
