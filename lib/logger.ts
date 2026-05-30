import pino from "pino";

/**
 * Logger configuration for the application
 * Uses Pino for structured logging with different transports based on environment
 */
const logger = pino({
  formatters: {
    level: (label) => {
      return { level: label.toUpperCase() };
    }
  },
  level: process.env.LOG_LEVEL || "info",
  timestamp: pino.stdTimeFunctions.isoTime,
  transport:
    process.env.NODE_ENV === "development"
      ? {
          options: {
            colorize: true,
            ignore: "pid,hostname",
            translateTime: "SYS:standard"
          },
          target: "pino-pretty"
        }
      : undefined
});

/**
 * Creates a child logger with additional context
 * @param context - Additional context to include in all log messages
 * @returns Child logger instance
 *
 * @example
 * const apiLogger = createLogger({ module: 'api', endpoint: '/users' });
 * apiLogger.info('Fetching users');
 */
export function createLogger(context: Record<string, unknown>) {
  return logger.child(context);
}

export default logger;
