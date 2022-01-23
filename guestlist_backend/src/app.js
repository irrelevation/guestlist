import express from "express";
import { errorHandler, custom404Handler, errorLogger } from "./middleware/errorMiddleware.js";
import { loggerMiddleware } from "./middleware/loggerMiddleware.js";
import { eventRouter } from "./routes/eventRoutes.js";
import { userRouter } from "./routes/userRoutes.js";
import cors from "cors";
import mongoose from "mongoose";
import { logger } from "./logger/index.js";

const MONGO_URL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.hcyd9.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;
mongoose
  .connect(MONGO_URL)
  .then(() => logger.info("Successfully connected to MongoDB"))
  .catch((e) => logger.error(`Could not connect to MongoDB: ${e}`));

mongoose.connection
  .on("disconnected", () => logger.error("Lost connection to MongoDB"))
  .on("reconnected", () => logger.info("Reconnected to MongoDB"));

export const app = express();
const API_URL_PREFIX = "/api/v1";

app.use(loggerMiddleware);
app.use(express.json());
app.use(cors());

app.use(`${API_URL_PREFIX}/events`, eventRouter);
app.use(`${API_URL_PREFIX}/users`, userRouter);

app.use(custom404Handler);
app.use(errorLogger);
app.use(errorHandler);
