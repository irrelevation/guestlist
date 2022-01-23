import createError from "http-errors";
import { logger } from "../logger";

export const custom404Handler = (req, res, next) => {
  const error = createError(404);
  next(error);
};

export const errorLogger = (err, req, res, next) => {
  logger.error(error.message);
  logger.debug(error.stack);
  next(err);
};

export const errorHandler = (err, req, res, next) => {
  err.status ??= 500;
  if (res.headersSent) {
    logger.info("Encountered an error while sending a response.");
    return next(err);
  }
  res.status(err.status);
  res.json({
    error: err.message,
    status: err.status,
  });
};
