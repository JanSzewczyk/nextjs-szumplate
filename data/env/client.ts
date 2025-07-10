import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
  client: {
    // Client env variables, eg:
    // NEXT_PUBLIC_CLIENT_VAR: z.string(),
  },
  experimental__runtimeEnv: {
    // NEXT_PUBLIC_CLIENT_VAR: process.env.NEXT_PUBLIC_CLIENT_VAR,
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
