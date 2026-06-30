"use client";

import { Button } from "@szum-tech/design-system";
import * as React from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  React.useEffect(() => {
    // biome-ignore lint/suspicious/noConsole: client error boundary logs to the browser console
    console.error("Application error occurred", {
      digest: error.digest,
      message: error.message,
      stack: error.stack
    });
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-center">
        <h2 className="mb-4 text-display-sm">Something went wrong!</h2>
        <p className="mb-4 text-muted-foreground">An unexpected error has occurred.</p>
        <Button onClick={reset} type="button">
          Try again
        </Button>
      </div>
    </div>
  );
}
