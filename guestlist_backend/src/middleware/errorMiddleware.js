import createError from "http-errors";
import { logger } from "../logger";

export const custom404Handler = (req, res, next) => {
  const error = createError(404);
  next(error);
};

export const errorLogger = (err, req, res, next) => {
  if (err.status >= 500) {
    logger.error(err.message);
  }
  logger.debug(err.stack);
  next(err);
};

export const errorHandler = (err, req, res, next) => {
  err.status ??= 500;
  // this guard clause redirects the request to the standard express error handler in order to end the response cycle. Otherwise the connection would be hanging
  if (res.headersSent) {
    logger.info("Encountered an error while sending a response.");
    return next(err);
  }
  res.status(err.status);

  const response = { status: err.status };

  // exclude sensitive error messages
  if (process.env.NODE_ENV === "development" || err.status < 500) response.error = err.message;
  res.json(response);
};
