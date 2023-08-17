const { createEnv } = require("@t3-oss/env-nextjs");
const { z } = require("zod");

const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    ANALYZE: z
      .enum(["true", "false"])
      .optional()
      .transform((value) => value === "true"),
    CI: z
      .enum(["true", "false", 0, 1])
      .optional()
      .transform((value) => value === "true" || value === 1)
  },
  client: {
    // Client env variables, eg:
    // NEXT_PUBLIC_CLIENT_VAR: z.string(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    ANALYZE: process.env.ANALYZE,
    CI: process.env.CI
  }
});

module.exports = { env };
