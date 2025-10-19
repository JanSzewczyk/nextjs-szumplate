"use client";

import { useEffect } from "react";

import logger from "~/lib/logger";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to the console and logging service
    logger.error(
      {
        error: {
          message: error.message,
          stack: error.stack,
          digest: error.digest
        }
      },
      "Application error occurred"
    );
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-center">
        <h2 className="mb-4 text-2xl font-bold">Something went wrong!</h2>
        <p className="mb-4 text-gray-600">An unexpected error has occurred.</p>
        <button onClick={() => reset()} className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          Try again
        </button>
      </div>
    </div>
  );
}
