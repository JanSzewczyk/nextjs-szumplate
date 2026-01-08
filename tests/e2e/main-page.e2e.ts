import { expect, test } from "@playwright/test";
import {
  FEATURE_TITLES,
  QUICK_START_STEPS,
  SCRIPTS,
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

  // Main heading
  await expect(page.getByRole("heading", { level: 1, name: /Szum-Tech.*Next\.js Template/i })).toBeVisible();

  // Hero description
  await expect(page.getByText(/Enterprise-ready Next\.js starter template/i)).toBeVisible();

  // CTA buttons
  await expect(page.getByRole("link", { name: /Use This Template/i }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: /View on GitHub/i }).first()).toBeVisible();
});

test("has features section", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 2, name: /Why Choose This Template/i })).toBeVisible();

  // Check all feature cards using constants
  for (const title of FEATURE_TITLES) {
    await expect(page.getByRole("heading", { level: 3, name: title })).toBeVisible();
  }
});

test("has tech stack section", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 2, name: /Tech Stack/i })).toBeVisible();

  // Tech stack categories from constants
  for (const category of TECH_STACK_CATEGORIES) {
    await expect(page.getByText(category)).toBeVisible();
  }

  // Tech stack items count from constants
  const techItems = page.locator("#tech-stack").getByRole("listitem");
  await expect(techItems).toHaveCount(TECH_STACK_COUNT);

  // Verify all technology images from constants
  for (const tech of TECH_STACK_ITEMS) {
    await expect(page.getByRole("img", { name: tech.name })).toBeVisible();
  }
});

test("has quick start section", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 2, name: /Quick Start/i })).toBeVisible();

  // Quick start steps from constants
  for (const step of QUICK_START_STEPS) {
    await expect(page.getByText(step.title)).toBeVisible();
    await expect(page.getByText(step.command)).toBeVisible();
  }
});

test("has scripts section", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 2, name: /Built-in Scripts/i })).toBeVisible();

  // Check all script commands from constants
  for (const script of SCRIPTS) {
    await expect(page.getByText(script.command, { exact: true })).toBeVisible();
  }
});

test("has footer", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("Szum-Tech Next.js Template")).toBeVisible();
  await expect(page.getByRole("link", { name: "Jan Szewczyk" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Source/i })).toBeVisible();
});

test("open GitHub repo in new tab", async ({ page, context }) => {
  const pagePromise = context.waitForEvent("page");

  await page.goto("/");

  // Click GitHub link in header
  await page.getByRole("link", { name: /View GitHub repository/i }).click();
  const newPage = await pagePromise;
  await newPage.waitForLoadState();

  expect(await newPage.title()).toMatch(/GitHub.*JanSzewczyk.*nextjs-szumplate/i);
  expect(newPage.url()).toMatch(/^https:\/\/github\.com\//);
});

test("tech stack links open in new tab", async ({ page, context }) => {
  const pagePromise = context.waitForEvent("page");

  await page.goto("/");

  // Click on first tech link (from constants)
  const firstTech = TECH_STACK_ITEMS[0];
  const escapedName = firstTech?.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  await page.getByRole("link", { name: new RegExp(`Learn more about ${escapedName}`, "i") }).click();
  const newPage = await pagePromise;
  await newPage.waitForLoadState();

  expect(newPage.url()).toMatch(new RegExp(`^${firstTech?.href.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`));
});
