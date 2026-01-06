import { type NextRequest, NextResponse } from "next/server";
import logger from "~/lib/logger";

export function proxy(request: NextRequest) {
  const startTime = Date.now();
  const requestId = crypto.randomUUID();

  // Create a logger with request context
  const requestLogger = logger.child({
    requestId,
    method: request.method,
    url: request.url,
    userAgent: request.headers.get("user-agent")
  });

  requestLogger.info("Incoming request");

  // Continue with the request
  const response = NextResponse.next();

  // Add request ID to response headers
  response.headers.set("X-Request-ID", requestId);

  // Log the response
  const duration = Date.now() - startTime;
  requestLogger.info(
    {
      status: response.status,
      duration
    },
    "Request completed"
  );

  return response;
}

// Configure which routes to run proxy on
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)"
  ]
};
