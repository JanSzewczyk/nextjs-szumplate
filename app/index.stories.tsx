import { expect, userEvent, within } from "storybook/test";
import Page from "~/app/page";
import {
  FEATURE_TITLES,
  QUICK_START_STEPS,
  SCRIPTS,
  SZUM_TECH_PACKAGE_COUNT,
  SZUM_TECH_PACKAGES,
  TECH_STACK_CATEGORIES,
  TECH_STACK_ITEMS
} from "~/constants";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "App/Home Page",
  component: Page,
  parameters: {
    nextjs: {
      router: {
        pathname: "/"
      }
    },
    layout: "fullscreen"
  }
});

/**
 * Tests the hero section with badge, heading, description, and CTA buttons.
 * Verifies all content matches the current design.
 */
export const HeroSection = meta.story({
  tags: ["test-only"],
  play: async ({ canvas, step }) => {
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
});

/**
 * Tests the features section with all 9 feature cards.
 * Verifies section heading and all feature titles are visible.
 */
export const FeaturesSection = meta.story({
  tags: ["test-only"],
  play: async ({ canvas, step }) => {
    await step("Verify features section heading", async () => {
      const heading = canvas.getByRole("heading", { name: /why choose this template\?/i, level: 2 });
      await expect(heading).toBeVisible();
    });

    await step("Verify features section description", async () => {
      const description = canvas.getByText(/everything you need to build production-ready applications/i);
      await expect(description).toBeVisible();
    });

    await step(`Verify all ${FEATURE_TITLES.length} feature cards are present`, async () => {
      // CardTitle from design system renders as div, not h3
      for (const title of FEATURE_TITLES) {
        const featureTitle = canvas.getByText(title);
        await expect(featureTitle).toBeVisible();
      }
    });
  }
});

/**
 * Tests the Szum-Tech Ecosystem section with all 4 package cards.
 * Verifies section heading, description, and all package information.
 */
export const SzumTechEcosystemSection: Story = {
  tags: ["test-only"],
  play: async ({ canvas, step }) => {
    await step("Verify ecosystem section heading", async () => {
      const heading = canvas.getByRole("heading", { name: /szum-tech ecosystem/i, level: 2 });
      await expect(heading).toBeVisible();
    });

    await step("Verify Open Source badge", async () => {
      const badge = canvas.getByText("Open Source");
      await expect(badge).toBeVisible();
    });

    await step("Verify ecosystem section description", async () => {
      const description = canvas.getByText(/powered by a suite of open-source packages/i);
      await expect(description).toBeVisible();
    });

    await step(`Verify all ${SZUM_TECH_PACKAGE_COUNT} package cards are present`, async () => {
      for (const pkg of SZUM_TECH_PACKAGES) {
        // Verify package name
        const packageName = canvas.getByText(pkg.name);
        await expect(packageName).toBeVisible();

        // Verify package npm name
        const npmName = canvas.getByText(pkg.packageName);
        await expect(npmName).toBeVisible();

        // Verify package description
        const description = canvas.getByText(pkg.description);
        await expect(description).toBeVisible();
      }
    });

    await step("Verify GitHub links for all packages", async () => {
      for (const pkg of SZUM_TECH_PACKAGES) {
        const githubLink = canvas.getByRole("button", { name: new RegExp(`view ${pkg.name} on github`, "i") });
        await expect(githubLink).toBeVisible();
        await expect(githubLink).toHaveAttribute("href", pkg.githubUrl);
      }
    });

    await step("Verify documentation link for Design System", async () => {
      // Only Design System has a docs link
      const designSystem = SZUM_TECH_PACKAGES.find((pkg) => pkg.docsUrl);
      if (designSystem) {
        const docsLink = canvas.getByRole("button", {
          name: new RegExp(`view documentation for ${designSystem.name}`, "i")
        });
        await expect(docsLink).toBeVisible();
        await expect(docsLink).toHaveAttribute("href", designSystem.docsUrl);
      }
    });

    await step("Verify Explore All Packages button", async () => {
      const exploreButton = canvas.getByRole("button", { name: /explore all packages/i });
      await expect(exploreButton).toBeVisible();
      await expect(exploreButton).toHaveAttribute("href", "https://github.com/JanSzewczyk");
    });
  }
};

/**
 * Tests the tech stack section with all 7 categories and 15 technologies.
 * Verifies category badges and technology links.
 */
export const TechStackSection = meta.story({
  tags: ["test-only"],
  play: async ({ canvas, step }) => {
    await step("Verify tech stack section heading", async () => {
      const heading = canvas.getByRole("heading", { name: /tech stack/i, level: 2 });
      await expect(heading).toBeVisible();
    });

    await step("Verify tech stack section description", async () => {
      const description = canvas.getByText(/carefully selected technologies for modern web development/i);
      await expect(description).toBeVisible();
    });

    await step(`Verify all ${TECH_STACK_CATEGORIES.length} category badges are present`, async () => {
      for (const label of TECH_STACK_CATEGORIES) {
        const badge = canvas.getByText(label);
        await expect(badge).toBeVisible();
      }
    });

    await step(`Verify all ${TECH_STACK_ITEMS.length} technology links are present`, async () => {
      for (const tech of TECH_STACK_ITEMS) {
        // Escape special regex characters in tech name
        const escapedName = tech.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const link = canvas.getByRole("link", { name: new RegExp(`learn more about ${escapedName}`, "i") });
        await expect(link).toBeVisible();
        await expect(link).toHaveAttribute("href", tech.href);
      }
    });
  }
});

/**
 * Tests tooltip interaction on tech stack items.
 * Verifies tooltip appears on hover with technology name and description.
 */
export const TechStackTooltipInteraction = meta.story({
  tags: ["test-only"],
  play: async ({ canvas, canvasElement, step }) => {
    // Select a sample tech item to test tooltip behavior
    // Using non-null assertion since TECH_STACK_ITEMS is guaranteed to have items
    const sampleTech = TECH_STACK_ITEMS[0]!;
    const escapedName = sampleTech.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    await step(`Hover over "${sampleTech.name}" to trigger tooltip`, async () => {
      const techLink = canvas.getByRole("link", { name: new RegExp(`learn more about ${escapedName}`, "i") });
      await expect(techLink).toBeVisible();

      // Hover to trigger tooltip
      await userEvent.hover(techLink);
    });

    await step("Verify tooltip content appears with name and description", async () => {
      // Tooltip renders in a portal outside the main canvas, so we need to query the parent
      const portal = within(canvasElement.parentElement as HTMLElement);

      // Wait for tooltip to appear - use role selector which targets the accessible tooltip
      const tooltip = await portal.findByRole("tooltip");
      await expect(tooltip).toBeInTheDocument();

      // Verify tooltip contains expected text
      const expectedTooltipText = `${sampleTech.name} - ${sampleTech.description}`;
      await expect(tooltip).toHaveTextContent(expectedTooltipText);
    });

    await step("Verify tooltip closes on unhover", async () => {
      const techLink = canvas.getByRole("link", { name: new RegExp(`learn more about ${escapedName}`, "i") });

      // Move mouse away to hide tooltip
      await userEvent.unhover(techLink);

      // Radix tooltip animates out so it may still be in DOM briefly.
      // Check that tooltip content has data-state="closed" indicating it's closing/closed.
      const portal = within(canvasElement.parentElement as HTMLElement);
      const tooltipContent = portal.queryByText(`${sampleTech.name} - ${sampleTech.description}`, {
        selector: '[data-slot="tooltip-content"]'
      });

      // Visual tooltip content should have closed state after unhover
      if (tooltipContent) {
        await expect(tooltipContent).toHaveAttribute("data-state", "closed");
      }
    });
  }
});

/**
 * Tests the quick start section with 3 steps.
 * Verifies step titles, descriptions, and commands.
 */
export const QuickStartSection = meta.story({
  tags: ["test-only"],
  play: async ({ canvas, step }) => {
    await step("Verify quick start section heading", async () => {
      const heading = canvas.getByRole("heading", { name: /quick start/i, level: 2 });
      await expect(heading).toBeVisible();
    });

    await step("Verify quick start section description", async () => {
      const description = canvas.getByText(/get up and running in minutes/i);
      await expect(description).toBeVisible();
    });

    await step(`Verify all ${QUICK_START_STEPS.length} quick start steps`, async () => {
      for (const quickStartStep of QUICK_START_STEPS) {
        const stepTitle = canvas.getByText(quickStartStep.title);
        await expect(stepTitle).toBeVisible();

        // Escape special regex characters in command
        const escapedCommand = quickStartStep.command.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const commands = canvas.getAllByText(new RegExp(escapedCommand));
        await expect(commands.length).toBeGreaterThanOrEqual(1);
      }
    });
  }
});

/**
 * Tests the built-in scripts section with 6 npm scripts.
 * Verifies section heading and all script commands.
 */
export const ScriptsSection = meta.story({
  tags: ["test-only"],
  play: async ({ canvas, step }) => {
    await step("Verify scripts section heading", async () => {
      const heading = canvas.getByRole("heading", { name: /built-in scripts/i, level: 2 });
      await expect(heading).toBeVisible();
    });

    await step("Verify scripts section description", async () => {
      const description = canvas.getByText(/all the npm scripts you need/i);
      await expect(description).toBeVisible();
    });

    await step(`Verify all ${SCRIPTS.length} scripts are present with descriptions`, async () => {
      for (const script of SCRIPTS) {
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
});

/**
 * Tests the CTA (Call to Action) section at the bottom.
 * Verifies heading and action buttons.
 */
export const CTASection = meta.story({
  tags: ["test-only"],
  play: async ({ canvas, step }) => {
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
});

/**
 * Tests the footer section with branding and links.
 * Verifies footer content and external links.
 */
export const FooterSection = meta.story({
  tags: ["test-only"],
  play: async ({ canvas, step }) => {
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
});

/**
 * Tests page structure and accessibility across the entire page.
 * Verifies heading hierarchy, main content structure, and sample external link attributes.
 */
export const PageStructureAndAccessibility = meta.story({
  tags: ["test-only"],
  play: async ({ canvas, step }) => {
    await step("Verify heading hierarchy", async () => {
      // H1 - Main page heading
      const h1 = canvas.getByRole("heading", { level: 1 });
      await expect(h1).toBeVisible();

      // H2 - Section headings (features, ecosystem, tech stack, quick start, scripts, cta)
      const h2Headings = canvas.getAllByRole("heading", { level: 2 });
      await expect(h2Headings.length).toBeGreaterThanOrEqual(6);
    });

    await step("Verify main content structure", async () => {
      const main = canvas.getByRole("main");
      await expect(main).toBeVisible();

      const footer = canvas.getByRole("contentinfo");
      await expect(footer).toBeVisible();
    });

    await step("Verify sample external links have proper security attributes", async () => {
      // Sample-check a few key external links instead of iterating over all
      // This is faster and less brittle while still validating the pattern

      // Check GitHub repository link (header)
      const githubButton = canvas.getByRole("button", { name: /view github repository/i });
      await expect(githubButton).toHaveAttribute("target", "_blank");
      await expect(githubButton).toHaveAttribute("rel", expect.stringContaining("noreferrer"));

      // Check author link in footer (regular link)
      const authorLink = canvas.getByRole("link", { name: /jan szewczyk/i });
      await expect(authorLink).toHaveAttribute("target", "_blank");
      await expect(authorLink).toHaveAttribute("rel", expect.stringContaining("noreferrer"));

      // Check a tech stack link
      const sampleTech = TECH_STACK_ITEMS[0]!;
      const escapedName = sampleTech.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const techLink = canvas.getByRole("link", { name: new RegExp(`learn more about ${escapedName}`, "i") });
      await expect(techLink).toHaveAttribute("target", "_blank");
      await expect(techLink).toHaveAttribute("rel", expect.stringContaining("noreferrer"));
    });
  }
});
