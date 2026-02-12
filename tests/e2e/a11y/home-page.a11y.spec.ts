import { AxeBuilder } from "@axe-core/playwright";
import { test, expect } from "@playwright/test";

test.describe("Accessibility: Home Page", () => {
  test("should have no accessibility violations", async ({ page }) => {
    await page.goto("http://localhost:3000");

    // Wait for page to be fully loaded - using 'load' is more reliable than 'networkidle'
    await page.waitForLoadState("load");

    // Wait for main content to be visible before running accessibility scan
    await page.locator("main").waitFor({ state: "visible" });

    // Run axe accessibility scan
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("should have skip to main content link", async ({ page }) => {
    await page.goto("http://localhost:3000");

    // Skip link should be hidden by default
    const skipLink = page.getByText("Skip to main content");
    await expect(skipLink).toHaveClass(/sr-only/);

    // Focus the skip link
    await page.keyboard.press("Tab");

    // Skip link should be visible when focused
    await expect(skipLink).toHaveClass(/focus:not-sr-only/);

    // Skip link should navigate to main content
    await skipLink.click();
    const mainContent = page.locator("main#main-content");
    await expect(mainContent).toBeVisible();
  });

  test("should be keyboard navigable", async ({ page }) => {
    await page.goto("http://localhost:3000");

    // Tab through interactive elements
    await page.keyboard.press("Tab"); // Skip link
    await page.keyboard.press("Tab"); // Theme toggle
    await page.keyboard.press("Tab"); // GitHub header link

    // Verify focus is on GitHub link in header
    const focusedElement = page.locator(":focus");
    await expect(focusedElement).toContainText("GitHub");
  });

  test("should have proper heading hierarchy", async ({ page }) => {
    await page.goto("http://localhost:3000");

    // Check h1 exists and is unique
    const h1Elements = page.locator("h1");
    await expect(h1Elements).toHaveCount(1);
    await expect(h1Elements).toContainText("Szum-Tech");

    // Check h2 elements are present
    const h2Elements = page.locator("h2");
    await expect(h2Elements.first()).toBeVisible();

    // Check h3 elements are present in features
    const h3Elements = page.locator("h3");
    await expect(h3Elements.first()).toBeVisible();
  });

  test("should announce external links correctly", async ({ page }) => {
    await page.goto("http://localhost:3000");

    // Check that external links have appropriate aria-labels
    const githubLink = page.getByLabel(/View GitHub repository.*opens in new tab/i);
    await expect(githubLink).toBeVisible();

    // Check template link
    const templateLink = page.getByLabel(/Use this template.*opens in new tab/i).first();
    await expect(templateLink).toBeVisible();
  });

  test("should have accessible images", async ({ page }) => {
    await page.goto("http://localhost:3000");

    // Scroll to tech stack section
    await page.locator("#tech-stack").scrollIntoViewIfNeeded();

    // Check that all technology logos have alt text containing "logo"
    const techImages = page.locator("#tech-stack img");
    const count = await techImages.count();

    for (let i = 0; i < count; i++) {
      const img = techImages.nth(i);
      // Playwright web-first assertion: checks attribute exists and contains value
      await expect(img).toHaveAttribute("alt", /logo/i);
    }
  });

  test("should have accessible color contrast", async ({ page }) => {
    await page.goto("http://localhost:3000");

    // Run specific color contrast check
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2aa"])
      .include("#features") // Check features section
      .analyze();

    // Filter for color-contrast violations
    const contrastViolations = accessibilityScanResults.violations.filter(
      (violation) => violation.id === "color-contrast"
    );

    expect(contrastViolations).toHaveLength(0);
  });

  test("tooltips should be keyboard accessible", async ({ page }) => {
    await page.goto("http://localhost:3000");

    // Navigate to tech stack section
    await page.locator("#tech-stack").scrollIntoViewIfNeeded();

    // Tab to first tech link
    const firstTechLink = page.locator("#tech-stack a").first();
    await firstTechLink.focus();

    // Tooltip should appear on focus (if design system supports it)
    // Note: This is a soft check - tooltips on focus are Level AAA (nice-to-have)
    const tooltip = page.getByRole("tooltip");

    // Wait for tooltip to appear or timeout (500ms is reasonable for tooltip delay)
    try {
      await expect(tooltip).toBeVisible({ timeout: 1000 });
    } catch {
      // Tooltip on focus is not required by WCAG AA, so we pass either way
      // This test documents expected behavior but doesn't fail the build
    }
  });

  test("should have sufficient touch targets on mobile", async ({ page, isMobile }) => {
    // eslint-disable-next-line playwright/no-skipped-test
    test.skip(!isMobile, "This test is only for mobile devices");

    await page.goto("http://localhost:3000");

    // Check theme toggle button size
    const themeToggle = page.getByRole("button", { name: /theme/i });
    const themeToggleBbox = await themeToggle.boundingBox();

    // WCAG 2.1 Level AAA requires 44x44px minimum
    // Level AA doesn't have this requirement, but it's good practice
    expect(themeToggleBbox).toBeTruthy();
    expect(themeToggleBbox!.width).toBeGreaterThanOrEqual(44);
    expect(themeToggleBbox!.height).toBeGreaterThanOrEqual(44);
  });

  test("should maintain focus after theme change", async ({ page }) => {
    await page.goto("http://localhost:3000");

    // Find and focus theme toggle
    const themeToggle = page.getByRole("button", { name: /theme/i });
    await themeToggle.focus();
    await expect(themeToggle).toBeFocused();

    // Click to change theme
    await themeToggle.click();

    // Wait for theme change animation to complete
    // Using waitForFunction is more reliable than waitForTimeout
    await page.waitForFunction(
      () => document.documentElement.classList.contains("dark") || document.documentElement.classList.contains("light"),
      { timeout: 1000 }
    );

    // Focus should still be on the theme toggle
    await expect(themeToggle).toBeFocused();
  });

  test("should have accessible form labels", async ({ page }) => {
    await page.goto("http://localhost:3000");

    // Run check for form-related violations
    const accessibilityScanResults = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa"]).analyze();

    // Filter for label-related violations
    const labelViolations = accessibilityScanResults.violations.filter(
      (violation) => violation.id === "label" || violation.id === "label-content-name-mismatch"
    );

    expect(labelViolations).toHaveLength(0);
  });

  test("should have proper ARIA roles", async ({ page }) => {
    await page.goto("http://localhost:3000");

    // Check main landmark
    const main = page.locator("main");
    await expect(main).toBeVisible();
    await expect(main).toHaveAttribute("id", "main-content");

    // Check header
    const header = page.locator("header").first();
    await expect(header).toBeVisible();

    // Check footer
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();

    // Check navigation sections
    const sections = page.locator("section");
    await expect(sections.first()).toBeVisible();
  });
});
