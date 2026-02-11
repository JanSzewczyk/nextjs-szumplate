import { describe, expect, test } from "vitest";

import logger, { createLogger } from "~/lib/logger";

describe("logger", () => {
  test("exports default logger instance", () => {
    expect(logger).toBeDefined();
    expect(typeof logger.info).toBe("function");
    expect(typeof logger.error).toBe("function");
    expect(typeof logger.warn).toBe("function");
    expect(typeof logger.debug).toBe("function");
    expect(typeof logger.fatal).toBe("function");
    expect(typeof logger.trace).toBe("function");
  });

  test("logger has correct level methods", () => {
    const levels = ["info", "error", "warn", "debug", "fatal", "trace"] as const;

    for (const level of levels) {
      expect(logger[level]).toBeDefined();
    }
  });
});

describe("createLogger", () => {
  test("creates child logger with context", () => {
    const childLogger = createLogger({ module: "test-module" });

    expect(childLogger).toBeDefined();
    expect(typeof childLogger.info).toBe("function");
    expect(typeof childLogger.error).toBe("function");
  });

  test("child logger includes bindings from context", () => {
    const context = { module: "api", endpoint: "/users" };
    const childLogger = createLogger(context);

    const bindings = childLogger.bindings();
    expect(bindings).toMatchObject(context);
  });

  test("child logger inherits parent level methods", () => {
    const childLogger = createLogger({ module: "test" });

    const levels = ["info", "error", "warn", "debug", "fatal", "trace"] as const;
    for (const level of levels) {
      expect(typeof childLogger[level]).toBe("function");
    }
  });

  test("child logger can write logs without throwing", () => {
    const childLogger = createLogger({ module: "test" });

    expect(() => childLogger.info("test message")).not.toThrow();
    expect(() => childLogger.error({ err: new Error("test") }, "error occurred")).not.toThrow();
    expect(() => childLogger.warn({ key: "value" }, "warning")).not.toThrow();
  });

  test("creates independent child loggers", () => {
    const logger1 = createLogger({ module: "module-1" });
    const logger2 = createLogger({ module: "module-2" });

    expect(logger1.bindings().module).toBe("module-1");
    expect(logger2.bindings().module).toBe("module-2");
  });
});
