import { type MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Next.js Szumplate",
    short_name: "Szumplate.js",
    description: "A Next.js application with Tailwind CSS and optimized setup.",
    start_url: "/",
    display: "standalone",
    background_color: "#1a202c", // Matches Tailwind's bg-app-background
    theme_color: "#1a202c" // Matches Tailwind's bg-app-background
  };
}
