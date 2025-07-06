import { expect, test } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Szumplate Next App/);
});

test("has content", async ({ page }) => {
  await page.goto("/");

  // Link to repo
  await expect(page.getByRole("button", { name: /See Repo/i })).toBeVisible();

  // Tile
  await expect(page.getByRole("heading", { level: 1, name: /Next App Template/ })).toBeVisible();
  await expect(page.getByText(/by Szum-Tech/)).toBeVisible();

  // Tech stack
  const technologies = [
    "Next",
    "TailwindCSS",
    "TypeScript",
    "Playwright",
    "Vitest",
    "Testing Library",
    "Prettier",
    "ESLint",
    "Semantic Release",
    "T3 ENV",
    "Storybook"
  ];
  await expect(page.getByRole("heading", { level: 2, name: /Tech stack/ })).toBeVisible();
  const techs = page.getByRole("listitem");
  await expect(techs).toHaveCount(11);
  for (const row of await techs.all()) {
    await expect(row.getByRole("link")).toBeVisible();
    const imgAlt = await row.getByRole("img").getAttribute("alt");
    expect(imgAlt && technologies.includes(imgAlt)).toBeTruthy();
  }
});

test("open repo in new tab", async ({ page, context }) => {
  const pagePromise = context.waitForEvent("page");

  await page.goto("/");

  // Click repo link
  await page.getByRole("button", { name: /See Repo/i }).click();
  const newPage = await pagePromise;
  await newPage.waitForLoadState();

  expect(await newPage.title()).toMatch(/GitHub - JanSzewczyk\/nextjs-szumplate/);
  expect(newPage.url()).toMatch(/^https:\/\/github.com\//);
});
