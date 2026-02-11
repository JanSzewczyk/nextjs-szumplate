import { expect, test } from "@playwright/test";
import {
  FEATURE_TITLES,
  QUICK_START_STEPS,
  SCRIPTS,
  SZUM_TECH_PACKAGE_COUNT,
  SZUM_TECH_PACKAGES,
  TECH_STACK_CATEGORIES,
  TECH_STACK_COUNT,
  TECH_STACK_ITEMS
} from "~/constants";

test("has title", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Szumplate Next App/);
});

test("has hero section content", async ({ page }) => {
  await page.goto("/");

  // Main heading - h1 contains span with "Szum-Tech" and text "Next.js Template"
  const h1 = page.getByRole("heading", { level: 1 });
  await expect(h1).toBeVisible();
  await expect(h1).toContainText("Szum-Tech");
  await expect(h1).toContainText("Next.js Template");

  // Hero description
  await expect(page.getByText(/Enterprise-ready Next\.js starter template/i)).toBeVisible();

  // CTA buttons - Button asChild renders as role="button" with href
  await expect(page.getByRole("button", { name: /Use This Template/i }).first()).toBeVisible();
  await expect(page.getByRole("button", { name: /View on GitHub/i }).first()).toBeVisible();
});

test("has features section", async ({ page }) => {
  await page.goto("/");

  const featuresSection = page.locator("#features");

  await expect(featuresSection.getByRole("heading", { level: 2, name: /Why Choose This Template/i })).toBeVisible();

  // Check all feature cards using constants
  // CardTitle renders as div, not h3, so we search by text within section
  for (const title of FEATURE_TITLES) {
    await expect(featuresSection.getByText(title, { exact: true })).toBeVisible();
  }
});

test("has szum-tech ecosystem section", async ({ page }) => {
  await page.goto("/");

  const ecosystemSection = page.locator("#ecosystem");

  // Verify section heading
  await expect(ecosystemSection.getByRole("heading", { level: 2, name: /Szum-Tech Ecosystem/i })).toBeVisible();

  // Verify Open Source badge
  await expect(ecosystemSection.getByText("Open Source")).toBeVisible();

  // Verify section description
  await expect(ecosystemSection.getByText(/powered by a suite of open-source packages/i)).toBeVisible();

  // Verify all package cards are present (4 packages)
  for (const pkg of SZUM_TECH_PACKAGES) {
    // Verify package name
    await expect(ecosystemSection.getByText(pkg.name, { exact: true })).toBeVisible();

    // Verify npm package name
    await expect(ecosystemSection.getByText(pkg.packageName)).toBeVisible();
  }

  // Verify the correct number of GitHub buttons (one per package)
  const githubButtons = ecosystemSection.getByRole("button", { name: /view .* on github/i });
  await expect(githubButtons).toHaveCount(SZUM_TECH_PACKAGE_COUNT);

  // Verify Explore All Packages button
  await expect(ecosystemSection.getByRole("button", { name: /Explore All Packages/i })).toBeVisible();
});

test("has tech stack section", async ({ page }) => {
  await page.goto("/");

  const techStackSection = page.locator("#tech-stack");

  await expect(techStackSection.getByRole("heading", { level: 2, name: /Tech Stack/i })).toBeVisible();

  // Tech stack categories from constants - use Badge elements
  for (const category of TECH_STACK_CATEGORIES) {
    await expect(techStackSection.getByText(category, { exact: true })).toBeVisible();
  }

  // Tech stack items count from constants
  const techItems = techStackSection.getByRole("listitem");
  await expect(techItems).toHaveCount(TECH_STACK_COUNT);

  // Verify all technology images from constants
  for (const tech of TECH_STACK_ITEMS) {
    await expect(techStackSection.getByRole("img", { name: tech.name })).toBeVisible();
  }
});

test("has quick start section", async ({ page }) => {
  await page.goto("/");

  const quickStartSection = page.locator("#quick-start");

  await expect(quickStartSection.getByRole("heading", { level: 2, name: /Quick Start/i })).toBeVisible();

  // Quick start steps from constants
  // CardTitle contains step number + title, so don't use exact match for title
  for (const step of QUICK_START_STEPS) {
    // Check that step title exists within the section (title is part of larger text with step number)
    await expect(quickStartSection.getByText(step.title)).toBeVisible();
    // Check that command exists within the section
    await expect(quickStartSection.getByText(step.command)).toBeVisible();
  }
});

test("has scripts section", async ({ page }) => {
  await page.goto("/");

  const scriptsSection = page.locator("#scripts");

  await expect(scriptsSection.getByRole("heading", { level: 2, name: /Built-in Scripts/i })).toBeVisible();

  // Check all script commands from constants within the scripts section
  for (const script of SCRIPTS) {
    await expect(scriptsSection.getByText(script.command, { exact: true })).toBeVisible();
  }
});

test("has footer", async ({ page }) => {
  await page.goto("/");

  const footer = page.getByRole("contentinfo");

  await expect(footer.getByText("Szum-Tech Next.js Template")).toBeVisible();
  await expect(footer.getByRole("link", { name: "Jan Szewczyk" })).toBeVisible();
  await expect(footer.getByRole("link", { name: /Source/i })).toBeVisible();
});

test("open GitHub repo in new tab", async ({ page, context }) => {
  await page.goto("/");

  // Click GitHub link in header - find by aria-label
  const pagePromise = context.waitForEvent("page");
  await page.getByLabel(/View GitHub repository/i).click();
  const newPage = await pagePromise;
  await newPage.waitForLoadState();

  expect(await newPage.title()).toMatch(/GitHub.*JanSzewczyk.*nextjs-szumplate/i);
  expect(newPage.url()).toMatch(/^https:\/\/github\.com\//);
});

test("tech stack links open in new tab", async ({ page, context }) => {
  await page.goto("/");

  const techStackSection = page.locator("#tech-stack");

  // Click on first tech link (from constants)
  const firstTech = TECH_STACK_ITEMS[0];
  // eslint-disable-next-line playwright/no-conditional-in-test -- type narrowing guard, not conditional test logic
  if (!firstTech) throw new Error("TECH_STACK_ITEMS is empty, expected at least one item");
  const escapedName = firstTech.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const pagePromise = context.waitForEvent("page");
  await techStackSection.getByRole("link", { name: new RegExp(`Learn more about ${escapedName}`, "i") }).click();
  const newPage = await pagePromise;
  await newPage.waitForLoadState();

  expect(newPage.url()).toMatch(new RegExp(`^${firstTech.href.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`));
});
