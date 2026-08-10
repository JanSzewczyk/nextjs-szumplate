import { NextRequest } from "next/server";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { createLogger } from "~/lib/logger";
import { proxy } from "~/proxy";

vi.mock("~/lib/logger", () => {
  const mockLogger = {
    info: vi.fn(),
    withMetadata: vi.fn()
  };
  mockLogger.withMetadata.mockReturnValue(mockLogger);

  return {
    createLogger: vi.fn(() => mockLogger)
  };
});

describe("proxy", () => {
  beforeEach(() => {
    vi.mocked(createLogger).mockClear();
  });

  test("creates a request-scoped logger with method, url and userAgent", () => {
    const request = new NextRequest("https://example.com/api/health", {
      headers: { "user-agent": "vitest" },
      method: "GET"
    });

    proxy(request);

    expect(createLogger).toHaveBeenCalledWith({
      method: "GET",
      requestId: expect.any(String),
      url: request.url,
      userAgent: "vitest"
    });
  });

  test("logs the incoming request and the completed request", () => {
    const request = new NextRequest("https://example.com/", { method: "GET" });

    proxy(request);

    const requestLogger = vi.mocked(createLogger).mock.results[0]?.value;
    expect(requestLogger.info).toHaveBeenCalledWith("Incoming request");
    expect(requestLogger.withMetadata).toHaveBeenCalledWith({
      duration: expect.any(Number),
      status: expect.any(Number)
    });
    expect(requestLogger.info).toHaveBeenCalledWith("Request completed");
  });

  test("sets the X-Request-ID response header to the same id used for logging", () => {
    const request = new NextRequest("https://example.com/", { method: "GET" });

    const response = proxy(request);
    const requestId = response.headers.get("X-Request-ID");

    expect(requestId).toBeTruthy();
    expect(createLogger).toHaveBeenCalledWith(expect.objectContaining({ requestId }));
  });
});
