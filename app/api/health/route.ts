import { NextResponse } from "next/server";
import logger from "~/lib/logger";

export function GET() {
  logger.info("Health check endpoint called");

  try {
    const response = { status: "ok", timestamp: new Date().toISOString() };
    logger.debug({ response }, "Health check successful");
    return NextResponse.json(response);
  } catch (error) {
    logger.error({ error }, "Health check failed");
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}
