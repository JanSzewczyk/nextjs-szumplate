import { z } from "zod";

import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    ANALYZE: z
      .enum(["true", "false"])
      .optional()
      .transform((value) => value === "true"),
    CI: z
      .enum(["true", "false", "0", "1"])
      .optional()
      .transform((value) => value === "true" || value === "1"),
    VERCEL_URL: z.string().url().optional()
  },
  client: {
    // Client env variables, eg:
    // NEXT_PUBLIC_CLIENT_VAR: z.string(),
  },
  runtimeEnv: {
    ANALYZE: process.env.ANALYZE,
    CI: process.env.CI,
    NODE_ENV: process.env.NODE_ENV,
    VERCEL_URL: process.env.VERCEL_URL
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true
});
