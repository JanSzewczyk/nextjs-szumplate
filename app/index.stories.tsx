import { type Meta, type StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";
import RootLayout from "~/app/layout";
import Page from "~/app/page";

const meta = {
  title: "App/Home Page",
  component: Page,
  parameters: {
    nextjs: {
      router: {
        pathname: "/"
      }
    },
    layout: "fullscreen"
  },
  decorators: [
    (Story) => (
      <RootLayout>
        <Story />
      </RootLayout>
    )
  ]
} satisfies Meta<typeof Page>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Tests the complete home page renders correctly with all major sections.
 * Verifies header navigation, hero section heading and CTA buttons are present.
 */
export const Default: Story = {
  name: "Home Page",
  tags: ["test-only"],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify header navigation", async () => {
      // Design system Button with asChild renders links with role="button"
      const docsButton = canvas.getByRole("button", { name: /view storybook documentation/i });
      await expect(docsButton).toBeVisible();
      await expect(docsButton).toHaveAttribute("href", "https://szum-tech-design-system.vercel.app/");

      const githubButton = canvas.getByRole("button", { name: /view github repository/i });
      await expect(githubButton).toBeVisible();
      await expect(githubButton).toHaveAttribute("href", "https://github.com/JanSzewczyk/nextjs-szumplate");
    });

    await step("Verify hero section heading", async () => {
      const heading = canvas.getByRole("heading", { name: /szum-tech next\.js template/i, level: 1 });
      await expect(heading).toBeVisible();
    });

    await step("Verify hero CTA buttons", async () => {
      // There are multiple "Use This Template" buttons - verify at least one exists
      const useTemplateButtons = canvas.getAllByRole("button", { name: /use this template/i });
      await expect(useTemplateButtons.length).toBeGreaterThanOrEqual(1);
      await expect(useTemplateButtons[0]).toBeVisible();

      const viewOnGitHubButton = canvas.getByRole("button", { name: /view on github/i });
      await expect(viewOnGitHubButton).toBeVisible();
    });
  }
};

/**
 * Tests the hero section with badge, heading, description, and CTA buttons.
 * Verifies all content matches the current design.
 */
export const HeroSection: Story = {
  tags: ["test-only"],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify technology badge", async () => {
      const badge = canvas.getByText(/next\.js 16.*react 19.*typescript.*rsc/i);
      await expect(badge).toBeVisible();
    });

    await step("Verify main heading", async () => {
      const heading = canvas.getByRole("heading", { name: /szum-tech next\.js template/i, level: 1 });
      await expect(heading).toBeVisible();
    });

    await step("Verify description text", async () => {
      const description = canvas.getByText(/enterprise-ready next\.js starter template/i);
      await expect(description).toBeVisible();
    });

    await step("Verify CTA buttons have correct links", async () => {
      // Design system Button with asChild renders links with role="button"
      // Multiple "Use This Template" buttons exist - check they all point to correct URL
      const useTemplateButtons = canvas.getAllByRole("button", { name: /use this template/i });
      await expect(useTemplateButtons.length).toBeGreaterThanOrEqual(1);
      for (const button of useTemplateButtons) {
        await expect(button).toHaveAttribute("href", "https://github.com/JanSzewczyk/nextjs-szumplate/generate");
      }

      const viewOnGitHubButton = canvas.getByRole("button", { name: /view on github/i });
      await expect(viewOnGitHubButton).toHaveAttribute("href", "https://github.com/JanSzewczyk/nextjs-szumplate");
    });
  }
};

/**
 * Tests the features section with all 9 feature cards.
 * Verifies section heading and all feature titles are visible.
 */
export const FeaturesSection: Story = {
  tags: ["test-only"],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify features section heading", async () => {
      const heading = canvas.getByRole("heading", { name: /why choose this template\?/i, level: 2 });
      await expect(heading).toBeVisible();
    });

    await step("Verify features section description", async () => {
      const description = canvas.getByText(/everything you need to build production-ready applications/i);
      await expect(description).toBeVisible();
    });

    await step("Verify all 9 feature cards are present", async () => {
      // CardTitle from design system renders as div, not h3
      const featureTitles = [
        "Next.js 16 Ready",
        "React Server Components",
        "Comprehensive Testing",
        "Enterprise Quality",
        "Structured Logging",
        "Health Checks",
        "SEO Optimized",
        "CI/CD Ready",
        "Type Safety"
      ];

      for (const title of featureTitles) {
        const featureTitle = canvas.getByText(title);
        await expect(featureTitle).toBeVisible();
      }
    });
  }
};

/**
 * Tests the tech stack section with all 7 categories and 15 technologies.
 * Verifies category badges and technology links.
 */
export const TechStackSection: Story = {
  tags: ["test-only"],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify tech stack section heading", async () => {
      const heading = canvas.getByRole("heading", { name: /tech stack/i, level: 2 });
      await expect(heading).toBeVisible();
    });

    await step("Verify tech stack section description", async () => {
      const description = canvas.getByText(/carefully selected technologies for modern web development/i);
      await expect(description).toBeVisible();
    });

    await step("Verify all category badges are present", async () => {
      const categoryLabels = [
        "Core Technologies",
        "Testing Suite",
        "Code Quality",
        "Infrastructure",
        "Forms",
        "CI/CD",
        "Configuration"
      ];

      for (const label of categoryLabels) {
        const badge = canvas.getByText(label);
        await expect(badge).toBeVisible();
      }
    });

    await step("Verify technology links are present", async () => {
      const techLinks = [
        { name: "Next.js 16", href: "https://nextjs.org" },
        { name: "TypeScript", href: "https://typescriptlang.org" },
        { name: "Tailwind CSS", href: "https://tailwindcss.com" },
        { name: "Vitest", href: "https://vitest.dev" },
        { name: "Playwright", href: "https://playwright.dev" },
        { name: "Testing Library", href: "https://testing-library.com" },
        { name: "Storybook", href: "https://storybook.js.org/" },
        { name: "ESLint", href: "https://eslint.org" },
        { name: "Prettier", href: "https://prettier.io" },
        { name: "Pino", href: "https://getpino.io" },
        { name: "Zod", href: "https://zod.dev" },
        { name: "React Hook Form", href: "https://react-hook-form.com" },
        { name: "GitHub Actions", href: "https://github.com/features/actions" },
        { name: "T3 Env", href: "https://env.t3.gg/" }
      ];

      for (const tech of techLinks) {
        const link = canvas.getByRole("link", { name: new RegExp(`learn more about ${tech.name}`, "i") });
        await expect(link).toBeVisible();
        await expect(link).toHaveAttribute("href", tech.href);
      }
    });
  }
};

/**
 * Tests the quick start section with 3 steps.
 * Verifies step titles, descriptions, and commands.
 */
export const QuickStartSection: Story = {
  tags: ["test-only"],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify quick start section heading", async () => {
      const heading = canvas.getByRole("heading", { name: /quick start/i, level: 2 });
      await expect(heading).toBeVisible();
    });

    await step("Verify quick start section description", async () => {
      const description = canvas.getByText(/get up and running in minutes/i);
      await expect(description).toBeVisible();
    });

    await step("Verify step 1 - Use Template", async () => {
      const stepTitle = canvas.getByText("Use Template");
      await expect(stepTitle).toBeVisible();

      const command = canvas.getByText(/gh repo create my-app --template JanSzewczyk\/nextjs-szumplate/i);
      await expect(command).toBeVisible();
    });

    await step("Verify step 2 - Install Dependencies", async () => {
      const stepTitle = canvas.getByText("Install Dependencies");
      await expect(stepTitle).toBeVisible();

      const command = canvas.getByText(/^npm install$/);
      await expect(command).toBeVisible();
    });

    await step("Verify step 3 - Start Development", async () => {
      const stepTitle = canvas.getByText("Start Development");
      await expect(stepTitle).toBeVisible();

      const commands = canvas.getAllByText(/npm run dev/);
      // There are multiple "npm run dev" texts on the page (in scripts section too)
      await expect(commands.length).toBeGreaterThanOrEqual(1);
    });
  }
};

/**
 * Tests the built-in scripts section with 6 npm scripts.
 * Verifies section heading and all script commands.
 */
export const ScriptsSection: Story = {
  tags: ["test-only"],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify scripts section heading", async () => {
      const heading = canvas.getByRole("heading", { name: /built-in scripts/i, level: 2 });
      await expect(heading).toBeVisible();
    });

    await step("Verify scripts section description", async () => {
      const description = canvas.getByText(/all the npm scripts you need/i);
      await expect(description).toBeVisible();
    });

    await step("Verify all 6 scripts are present with descriptions", async () => {
      const scripts = [
        { command: "npm run dev", description: "Start development server with Turbopack" },
        { command: "npm run build", description: "Create production build" },
        { command: "npm run test", description: "Run all Vitest tests" },
        { command: "npm run test:e2e", description: "Run Playwright E2E tests" },
        { command: "npm run lint", description: "ESLint code check" },
        { command: "npm run storybook:dev", description: "Component development environment" }
      ];

      for (const script of scripts) {
        const commandElements = canvas.getAllByText(script.command);
        await expect(commandElements.length).toBeGreaterThanOrEqual(1);

        const descriptionElement = canvas.getByText(script.description);
        await expect(descriptionElement).toBeVisible();
      }
    });

    await step("Verify package.json reference", async () => {
      const reference = canvas.getByText(/see all available scripts in/i);
      await expect(reference).toBeVisible();
    });
  }
};

/**
 * Tests the CTA (Call to Action) section at the bottom.
 * Verifies heading and action buttons.
 */
export const CTASection: Story = {
  tags: ["test-only"],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify CTA section heading", async () => {
      const heading = canvas.getByRole("heading", { name: /ready to build something amazing\?/i, level: 2 });
      await expect(heading).toBeVisible();
    });

    await step("Verify CTA section description", async () => {
      const description = canvas.getByText(/start your next project with the szum-tech template/i);
      await expect(description).toBeVisible();
    });

    await step("Verify CTA buttons", async () => {
      // There are multiple "Use This Template" buttons - get all and verify at least 2 exist
      const useTemplateButtons = canvas.getAllByRole("button", { name: /use this template/i });
      await expect(useTemplateButtons.length).toBeGreaterThanOrEqual(2);

      const exploreCodeButton = canvas.getByRole("button", { name: /explore the code/i });
      await expect(exploreCodeButton).toBeVisible();
      await expect(exploreCodeButton).toHaveAttribute("href", "https://github.com/JanSzewczyk/nextjs-szumplate");
    });
  }
};

/**
 * Tests the footer section with branding and links.
 * Verifies footer content and external links.
 */
export const FooterSection: Story = {
  tags: ["test-only"],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify footer branding", async () => {
      const branding = canvas.getByText("Szum-Tech Next.js Template");
      await expect(branding).toBeVisible();
    });

    await step("Verify copyright year", async () => {
      const currentYear = new Date().getFullYear().toString();
      const yearElement = canvas.getByText(currentYear);
      await expect(yearElement).toBeVisible();
    });

    await step("Verify author link", async () => {
      const authorLink = canvas.getByRole("link", { name: /jan szewczyk/i });
      await expect(authorLink).toBeVisible();
      await expect(authorLink).toHaveAttribute("href", "https://github.com/JanSzewczyk");
    });

    await step("Verify source code link", async () => {
      const sourceLink = canvas.getByRole("link", { name: /source/i });
      await expect(sourceLink).toBeVisible();
      await expect(sourceLink).toHaveAttribute("href", "https://github.com/JanSzewczyk/nextjs-szumplate");
    });
  }
};

/**
 * Tests accessibility and navigation across the entire page.
 * Verifies all sections have proper headings and links are accessible.
 */
export const AccessibilityAndNavigation: Story = {
  tags: ["test-only"],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify heading hierarchy", async () => {
      // H1 - Main page heading
      const h1 = canvas.getByRole("heading", { level: 1 });
      await expect(h1).toBeVisible();

      // H2 - Section headings (features, tech stack, quick start, scripts, cta)
      const h2Headings = canvas.getAllByRole("heading", { level: 2 });
      await expect(h2Headings.length).toBeGreaterThanOrEqual(5);
    });

    await step("Verify all external links have proper attributes", async () => {
      // Check regular links (not styled as buttons)
      const allLinks = canvas.getAllByRole("link");
      for (const link of allLinks) {
        const href = link.getAttribute("href");
        // External links should open in new tab
        if (href && !href.startsWith("/") && !href.startsWith("#")) {
          await expect(link).toHaveAttribute("target", "_blank");
          await expect(link).toHaveAttribute("rel", expect.stringContaining("noreferrer"));
        }
      }

      // Check button-styled links (design system Button with asChild)
      const allButtons = canvas.getAllByRole("button");
      for (const button of allButtons) {
        const href = button.getAttribute("href");
        // Only check anchor elements styled as buttons
        if (href && button.tagName.toLowerCase() === "a") {
          await expect(button).toHaveAttribute("target", "_blank");
          await expect(button).toHaveAttribute("rel", expect.stringContaining("noreferrer"));
        }
      }
    });

    await step("Verify main content structure", async () => {
      const main = canvas.getByRole("main");
      await expect(main).toBeVisible();

      const footer = canvas.getByRole("contentinfo");
      await expect(footer).toBeVisible();
    });
  }
};
