import { createLogger, format, transports } from "winston";
const { combine, timestamp, json } = format;

export const productionLogger = () => {
  return createLogger({
    level: "info",
    format: combine(timestamp(), json()),
    // defaultMeta: { service: "user-service" },
    transports: [
      new transports.File({ filename: "./logs/error.log", level: "error" }),
      new transports.File({ filename: "./logs/combined.log" }),
    ],
  });
};
