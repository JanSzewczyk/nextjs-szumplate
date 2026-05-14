import { expect, screen, waitFor } from "storybook/test";
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

export const HomePage = meta.story();

HomePage.test("Hero section — badge, heading, description, and CTA links", async ({ canvas, step }) => {
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

  await step("Verify CTA buttons link to correct URLs", async () => {
    const useTemplateButtons = canvas.getAllByRole("link", { name: /use this template/i });
    await expect(useTemplateButtons.length).toBeGreaterThanOrEqual(1);
    for (const button of useTemplateButtons) {
      await expect(button).toHaveAttribute("href", "https://github.com/JanSzewczyk/nextjs-szumplate/generate");
    }

    const viewOnGitHubButton = canvas.getByRole("link", { name: /view on github/i });
    await expect(viewOnGitHubButton).toHaveAttribute("href", "https://github.com/JanSzewczyk/nextjs-szumplate");
  });
});

HomePage.test(`Features section — heading and all ${FEATURE_TITLES.length} feature cards`, async ({ canvas, step }) => {
  await step("Verify features section heading", async () => {
    const heading = canvas.getByRole("heading", { name: /why choose this template\?/i, level: 2 });
    await expect(heading).toBeVisible();
  });

  await step("Verify features section description", async () => {
    const description = canvas.getByText(/everything you need to build production-ready applications/i);
    await expect(description).toBeVisible();
  });

  await step(`Verify all ${FEATURE_TITLES.length} feature cards are present`, async () => {
    for (const title of FEATURE_TITLES) {
      const featureTitle = canvas.getByText(title);
      await expect(featureTitle).toBeVisible();
    }
  });
});

HomePage.test(
  `Szum-Tech Ecosystem section — heading and all ${SZUM_TECH_PACKAGE_COUNT} package cards`,
  async ({ canvas, step }) => {
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
        const packageName = canvas.getByText(pkg.name);
        await expect(packageName).toBeVisible();

        const npmName = canvas.getByText(pkg.packageName);
        await expect(npmName).toBeVisible();

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
);

HomePage.test(
  `Tech Stack section — heading and all ${TECH_STACK_ITEMS.length} technology links`,
  async ({ canvas, step }) => {
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
        const escapedName = tech.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const link = canvas.getByRole("link", { name: new RegExp(`learn more about ${escapedName}`, "i") });
        await expect(link).toBeVisible();
        await expect(link).toHaveAttribute("href", tech.href);
      }
    });
  }
);

HomePage.test("Tech Stack tooltip — appears on hover and closes on unhover", async ({ canvas, step, userEvent }) => {
  const sampleTech = TECH_STACK_ITEMS[0]!;
  const escapedName = sampleTech.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  await step(`Hover over "${sampleTech.name}" to trigger tooltip`, async () => {
    const techLink = canvas.getByRole("link", { name: new RegExp(`learn more about ${escapedName}`, "i") });
    await expect(techLink).toBeVisible();
    await userEvent.hover(techLink);
  });

  await step("Verify tooltip content appears with name and description", async () => {
    await waitFor(async () => {
      const tooltip = await screen.findByRole("tooltip");
      await expect(tooltip).toBeInTheDocument();
      await expect(tooltip).toHaveTextContent(`${sampleTech.name} - ${sampleTech.description}`);
    });
  });

  await step("Verify tooltip closes on unhover", async () => {
    const techLink = canvas.getByRole("link", { name: new RegExp(`learn more about ${escapedName}`, "i") });
    await userEvent.unhover(techLink);

    await waitFor(async () => {
      const tooltip = screen.queryByRole("tooltip");
      if (tooltip) {
        await expect(tooltip).toHaveAttribute("data-state", "closed");
      }
    });
  });
});

HomePage.test(`Quick Start section — heading and all ${QUICK_START_STEPS.length} steps`, async ({ canvas, step }) => {
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

      const escapedCommand = quickStartStep.command.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const commands = canvas.getAllByText(new RegExp(escapedCommand));
      await expect(commands.length).toBeGreaterThanOrEqual(1);
    }
  });
});

HomePage.test(`Scripts section — heading and all ${SCRIPTS.length} npm scripts`, async ({ canvas, step }) => {
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
      const descriptionElement = canvas.getByText(script.description);
      await expect(descriptionElement).toBeVisible();
    }
  });

  await step("Verify package.json reference", async () => {
    const reference = canvas.getByText(/see all available scripts in/i);
    await expect(reference).toBeVisible();
  });
});

HomePage.test("CTA section — heading and action buttons", async ({ canvas, step }) => {
  await step("Verify CTA section heading", async () => {
    const heading = canvas.getByRole("heading", { name: /ready to build something amazing\?/i, level: 2 });
    await expect(heading).toBeVisible();
  });

  await step("Verify CTA section description", async () => {
    const description = canvas.getByText(/start your next project with the szum-tech template/i);
    await expect(description).toBeVisible();
  });

  await step("Verify CTA buttons", async () => {
    const useTemplateButtons = canvas.getAllByRole("link", { name: /use this template/i });
    await expect(useTemplateButtons.length).toBeGreaterThanOrEqual(2);

    const exploreCodeButton = canvas.getByRole("link", { name: /explore the code/i });
    await expect(exploreCodeButton).toBeVisible();
    await expect(exploreCodeButton).toHaveAttribute("href", "https://github.com/JanSzewczyk/nextjs-szumplate");
  });
});

HomePage.test("Footer section — branding and links", async ({ canvas, step }) => {
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
});

HomePage.test("Page structure and accessibility", async ({ canvas, step }) => {
  await step("Verify heading hierarchy", async () => {
    const h1 = canvas.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();

    const h2Headings = canvas.getAllByRole("heading", { level: 2 });
    await expect(h2Headings.length).toBeGreaterThanOrEqual(6);
  });

  await step("Verify main content structure", async () => {
    const main = canvas.getByRole("main");
    await expect(main).toBeVisible();

    const footer = canvas.getByRole("contentinfo");
    await expect(footer).toBeVisible();
  });

  await step("Verify external links have proper security attributes", async () => {
    const githubButton = canvas.getByRole("link", { name: /view github repository/i });
    await expect(githubButton).toHaveAttribute("target", "_blank");
    await expect(githubButton).toHaveAttribute("rel", expect.stringContaining("noreferrer"));

    const authorLink = canvas.getByRole("link", { name: /jan szewczyk/i });
    await expect(authorLink).toHaveAttribute("target", "_blank");
    await expect(authorLink).toHaveAttribute("rel", expect.stringContaining("noreferrer"));

    const sampleTech = TECH_STACK_ITEMS[0]!;
    const escapedName = sampleTech.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const techLink = canvas.getByRole("link", { name: new RegExp(`learn more about ${escapedName}`, "i") });
    await expect(techLink).toHaveAttribute("target", "_blank");
    await expect(techLink).toHaveAttribute("rel", expect.stringContaining("noreferrer"));
  });
});
