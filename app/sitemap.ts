import type { MetadataRoute } from "next";

import { env } from "~/data/env/server";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ lastModified: new Date().toISOString(), url: `${env.VERCEL_URL}/` }];
}
