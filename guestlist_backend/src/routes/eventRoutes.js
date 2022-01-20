import express from "express";
import * as eventController from "../controller/eventController";

export const eventRouter = express.Router();

eventRouter.route("/").post(eventController.createEvent);
