export type SzumTechIconName = "PaletteIcon" | "ShieldCheckIcon" | "SparklesIcon" | "TagIcon";

export interface SzumTechPackage {
  description: string;
  docsUrl?: string;
  features: Array<string>;
  githubUrl: string;
  iconName: SzumTechIconName;
  name: string;
  packageName: string;
}

export const SZUM_TECH_PACKAGES: Array<SzumTechPackage> = [
  {
    description:
      "A comprehensive UI component library built on shadcn/ui principles, providing accessible, customizable components for building modern React applications.",
    docsUrl: "https://szum-tech-design-system.vercel.app/",
    features: ["Button", "Card", "Header", "Badge", "Tooltip", "Form Components"],
    githubUrl: "https://github.com/JanSzewczyk/design-system",
    iconName: "PaletteIcon",
    name: "Design System",
    packageName: "@szum-tech/design-system"
  },
  {
    description:
      "Shared ESLint configuration ensuring consistent code quality across projects with carefully curated rules for TypeScript and React.",
    features: ["TypeScript Support", "React Rules", "Import Sorting", "Best Practices"],
    githubUrl: "https://github.com/JanSzewczyk/eslint-config",
    iconName: "ShieldCheckIcon",
    name: "ESLint Config",
    packageName: "@szum-tech/eslint-config"
  },
  {
    description:
      "Shared Prettier configuration for consistent code formatting, eliminating style debates and ensuring uniform code appearance.",
    features: ["Consistent Formatting", "Team Standards", "Auto-fix Support", "Editor Integration"],
    githubUrl: "https://github.com/JanSzewczyk/prettier-config",
    iconName: "SparklesIcon",
    name: "Prettier Config",
    packageName: "@szum-tech/prettier-config"
  },
  {
    description:
      "Shared Semantic Release configuration for fully automated versioning and changelog generation based on commit conventions.",
    features: ["Auto Versioning", "Changelog Generation", "NPM Publishing", "GitHub Releases"],
    githubUrl: "https://github.com/JanSzewczyk/semantic-release-config",
    iconName: "TagIcon",
    name: "Semantic Release Config",
    packageName: "@szum-tech/semantic-release-config"
  }
];

/** All package names in the ecosystem */
export const SZUM_TECH_PACKAGE_NAMES = SZUM_TECH_PACKAGES.map((pkg) => pkg.packageName);

/** Total count of packages */
export const SZUM_TECH_PACKAGE_COUNT = SZUM_TECH_PACKAGES.length;
