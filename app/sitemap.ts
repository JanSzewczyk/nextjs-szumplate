import { type MetadataRoute } from "next";

import { env } from "~/data/env/server";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${env.VERCEL_URL}/`, lastModified: new Date().toISOString() }];
}
