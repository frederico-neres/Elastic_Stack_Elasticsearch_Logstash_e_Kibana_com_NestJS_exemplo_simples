import { createLogger, transports, Logger } from "winston";

var logger: Logger;

export function initLogger(): Logger {
    logger = createLogger({
        level: "info",
        transports: [new transports.Console()],
    });

    return logger
}

export function getLogger(): Logger {
    return logger;
}
  