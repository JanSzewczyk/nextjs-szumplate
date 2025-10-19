"use client";

import { useEffect } from "react";

import { Button } from "@szum-tech/design-system";
import logger from "~/lib/logger";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
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
      "Global error occurred"
    );
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center">
          <div className="text-center">
            <h2 className="mb-4 text-2xl font-bold">Something went wrong!</h2>
            <p className="mb-4 text-gray-600">A critical error has occurred.</p>
            <Button onClick={() => reset()}>Try again</Button>
          </div>
        </div>
      </body>
    </html>
  );
}
