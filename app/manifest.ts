import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: "#1a202c", // Matches Tailwind's bg-app-background
    description: "A Next.js application with Tailwind CSS and optimized setup.",
    display: "standalone",
    name: "Next.js Szumplate",
    short_name: "Szumplate.js",
    start_url: "/",
    theme_color: "#1a202c" // Matches Tailwind's bg-app-background
  };
}
