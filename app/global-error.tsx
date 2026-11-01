"use client";

import { Button } from "@szum-tech/design-system";
import * as React from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  React.useEffect(() => {
    // biome-ignore lint/suspicious/noConsole: client error boundary logs to the browser console
    console.error("Application error occurred", {
      digest: error.digest,
      message: error.message,
      stack: error.stack
    });
    // TODO: wire this into an error-tracking provider (Sentry, Bugsnag, ...) if needed
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center">
          <div className="text-center">
            <h2 className="text-display-sm mb-4">Something went wrong!</h2>
            <p className="text-muted-foreground mb-4">A critical error has occurred.</p>
            <Button onClick={() => reset()}>Try again</Button>
          </div>
        </div>
      </body>
    </html>
  );
}
