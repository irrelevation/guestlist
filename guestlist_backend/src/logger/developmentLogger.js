import { createLogger, format, transports } from "winston";
const { combine, colorize, timestamp, printf } = format;

export const developmentLogger = () => {
  return createLogger({
    level: "debug",
    format: combine(
      colorize(),
      timestamp({ format: "hh:mm:ss" }),
      //   align(),
      printf(({ timestamp, level, message }) => `${timestamp} [${level}] ${message}`)
    ),
    // defaultMeta: { service: "user-service" },
    transports: [new transports.Console()],
  });
};
