import path from "node:path";
import { LogFileRotationTransport } from "@loglayer/transport-log-file-rotation";
import { PinoTransport } from "@loglayer/transport-pino";
import { LogLayer, type LogLayerTransport } from "loglayer";
import pino from "pino";
import { serializeError } from "serialize-error";

const LOG_LEVEL = process.env.LOG_LEVEL || "info";
const IS_DEV = process.env.NODE_ENV === "development";

const LogDir = path.join(process.cwd(), "tmp");
const LogFilePath = path.join(LogDir, "app.log");
const AuditFilePath = path.join(LogDir, "audit.json");

const pinoLogger = pino({
  formatters: {
    level: (label) => {
      return { level: label.toUpperCase() };
    }
  },
  level: LOG_LEVEL,
  timestamp: pino.stdTimeFunctions.isoTime,
  transport: IS_DEV
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

const transports: Array<LogLayerTransport> = [new PinoTransport({ logger: pinoLogger })];

if (IS_DEV) {
  transports.push(
    new LogFileRotationTransport({
      auditFile: AuditFilePath,
      filename: LogFilePath
    })
  );
}

/**
 * Root LogLayer instance. Fans out every log entry to Pino (console) and,
 * in development only, to a rotating file under a project-local `tmp`
 * directory so a session's log history can be reviewed and analyzed afterwards.
 */
const logger = new LogLayer({
  errorSerializer: serializeError,
  transport: transports
});

/**
 * Creates a child logger with additional persistent context.
 * @param context - Additional context to include in all log messages
 * @returns Child logger instance
 *
 * @example
 * const apiLogger = createLogger({ module: 'api', endpoint: '/users' });
 * apiLogger.info('Fetching users');
 */
export function createLogger(context: Record<string, unknown>) {
  return logger.child().withContext(context);
}

export default logger;
