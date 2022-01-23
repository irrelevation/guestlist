import morgan from "morgan";
import { logger } from "../logger/index";

const stream = {
  write: (message) => logger.http(message),
};

const format = process.env === "development" ? "dev" : "short";

export const loggerMiddleware = morgan(format, { stream });
