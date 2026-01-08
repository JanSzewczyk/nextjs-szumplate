import { expect, test } from "@playwright/test";

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

  // Check some feature cards
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
    await expect(page.getByRole("heading", { level: 3, name: title })).toBeVisible();
  }
});

test("has tech stack section", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 2, name: /Tech Stack/i })).toBeVisible();

  // Tech stack categories
  const categories = [
    "Core Technologies",
    "Testing Suite",
    "Code Quality",
    "Infrastructure",
    "Forms",
    "CI/CD",
    "Configuration"
  ];

  for (const category of categories) {
    await expect(page.getByText(category)).toBeVisible();
  }

  // Tech stack items (15 total)
  const technologies = [
    "Next.js 16",
    "TypeScript",
    "Tailwind CSS",
    "Vitest",
    "Playwright",
    "Testing Library",
    "Storybook",
    "ESLint",
    "Prettier",
    "Semantic Release",
    "Pino",
    "Zod",
    "React Hook Form",
    "GitHub Actions",
    "T3 Env"
  ];

  const techItems = page.locator("#tech-stack").getByRole("listitem");
  await expect(techItems).toHaveCount(15);

  for (const tech of technologies) {
    await expect(page.getByRole("img", { name: tech })).toBeVisible();
  }
});

test("has quick start section", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 2, name: /Quick Start/i })).toBeVisible();

  // Quick start steps
  await expect(page.getByText("Use Template")).toBeVisible();
  await expect(page.getByText("Install Dependencies")).toBeVisible();
  await expect(page.getByText("Start Development")).toBeVisible();

  // Commands
  await expect(page.getByText("gh repo create my-app --template JanSzewczyk/nextjs-szumplate")).toBeVisible();
  await expect(page.getByText("npm install")).toBeVisible();
  await expect(page.getByText("npm run dev")).toBeVisible();
});

test("has scripts section", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 2, name: /Built-in Scripts/i })).toBeVisible();

  // Check some script commands
  const scripts = [
    "npm run dev",
    "npm run build",
    "npm run test",
    "npm run test:e2e",
    "npm run lint",
    "npm run storybook:dev"
  ];

  for (const script of scripts) {
    await expect(page.getByText(script, { exact: true })).toBeVisible();
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

  // Click on Next.js tech link
  await page.getByRole("link", { name: /Learn more about Next\.js 16/i }).click();
  const newPage = await pagePromise;
  await newPage.waitForLoadState();

  expect(newPage.url()).toMatch(/^https:\/\/nextjs\.org\//);
});
