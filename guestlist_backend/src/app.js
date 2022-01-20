import express from "express";
import { eventRouter } from "./routes/eventRoutes.js";

export const app = express();
const API_URL_PREFIX = "/api/v1";

app.get(`${API_URL_PREFIX}/`, (req, res) => {
  return res.status(200).send({
    message: "API works",
  });
});

app.use(`${API_URL_PREFIX}/events`, eventRouter);
