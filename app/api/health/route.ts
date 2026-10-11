import { NextResponse } from "next/server";
import logger from "~/lib/logger";

export function GET() {
  logger.info("Health check endpoint called");

  try {
    const response = { status: "ok", timestamp: new Date().toISOString() };
    void logger.withMetadata({ response }).debug("Health check successful");
    return NextResponse.json(response);
  } catch (error) {
    void logger.withError(error).error("Health check failed");
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}
