import { expect, waitFor, within } from "storybook/test";

import { ThemeToggle } from "./theme-toggle";

import preview from "~/.storybook/preview";

const meta = preview.meta({
  title: "Components/UI/Theme Toggle",
  component: ThemeToggle,
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center p-8">
        <Story />
      </div>
    )
  ],
  parameters: {
    layout: "centered"
  }
});

/**
 * Default story showing the ThemeToggle component.
 * The displayed icon depends on the current Storybook theme mode.
 */
export const Default = meta.story({});
Default.test("Theme cycling behavior", async ({ canvas, step, userEvent }) => {
  const button = canvas.getByRole("button");

  // Get initial theme from aria-label
  const getThemeFromLabel = () => {
    const label = button.getAttribute("aria-label") || "";
    const match = label.match(/Current: (System|Light|Dark) theme/);
    return match ? match[1] : null;
  };

  const initialTheme = getThemeFromLabel();

  await step(`Starting from ${initialTheme} theme, click to cycle to next theme`, async () => {
    await userEvent.click(button);

    await waitFor(async () => {
      const newTheme = getThemeFromLabel();
      await expect(newTheme).not.toBe(initialTheme);
    });
  });

  const secondTheme = getThemeFromLabel();

  await step(`From ${secondTheme} theme, click to cycle to next theme`, async () => {
    await userEvent.click(button);

    await waitFor(async () => {
      const newTheme = getThemeFromLabel();
      await expect(newTheme).not.toBe(secondTheme);
    });
  });

  const thirdTheme = getThemeFromLabel();

  await step(`From ${thirdTheme} theme, click to cycle back to initial theme`, async () => {
    await userEvent.click(button);

    await waitFor(async () => {
      const newTheme = getThemeFromLabel();
      await expect(newTheme).toBe(initialTheme);
    });
  });
});

Default.test("Button Has Correct Role", async ({ canvas, step }) => {
  await step("Verify element has button role", async () => {
    const button = canvas.getByRole("button");
    await expect(button).toBeVisible();
    await expect(button.tagName.toLowerCase()).toBe("button");
  });

  await step("Verify button is not disabled in mounted state", async () => {
    const button = canvas.getByRole("button");
    await expect(button).not.toBeDisabled();
  });

  await step("Verify button is focusable", async () => {
    const button = canvas.getByRole("button");
    button.focus();
    await expect(button).toHaveFocus();
  });
});

/**
 * Tests that the component renders with the correct initial state.
 * Verifies button visibility and presence of an icon.
 * Note: The actual theme depends on Storybook's dark mode setting.
 */
export const InitialState = meta.story({
  tags: ["test-only"],
  play: async ({ canvas, step }) => {
    await step("Verify button is visible and enabled", async () => {
      const button = canvas.getByRole("button");
      await expect(button).toBeVisible();
      await expect(button).not.toBeDisabled();
    });

    await step("Verify button contains an icon", async () => {
      const button = canvas.getByRole("button");
      const svg = button.querySelector("svg");
      await expect(svg).toBeInTheDocument();
    });

    await step("Verify aria-label is present with theme information", async () => {
      const button = canvas.getByRole("button");
      const ariaLabel = button.getAttribute("aria-label");
      await expect(ariaLabel).toMatch(/Current: (System|Light|Dark) theme/);
      await expect(ariaLabel).toMatch(/Click to switch to (System|Light|Dark) theme/);
    });
  }
});

/**
 * Tests that clicking cycles through all three themes.
 * Verifies complete cycle: initial -> second -> third -> initial
 */
export const FullThemeCycle = meta.story({
  tags: ["test-only"],
  play: async ({ canvas, step, userEvent }) => {
    const button = canvas.getByRole("button");
    const themesVisited: string[] = [];

    const getThemeFromLabel = (): string => {
      const label = button.getAttribute("aria-label") || "";
      const match = label.match(/Current: (System|Light|Dark) theme/);
      return match?.[1] ?? "Unknown";
    };

    // Record initial theme
    const initialTheme = getThemeFromLabel();
    themesVisited.push(initialTheme);

    await step("Click three times to complete full cycle", async () => {
      // First click
      await userEvent.click(button);
      await waitFor(() => {
        const theme = getThemeFromLabel();
        if (!themesVisited.includes(theme)) {
          themesVisited.push(theme);
        }
      });

      // Second click
      await userEvent.click(button);
      await waitFor(() => {
        const theme = getThemeFromLabel();
        if (!themesVisited.includes(theme)) {
          themesVisited.push(theme);
        }
      });

      // Third click (should return to initial)
      await userEvent.click(button);
      await waitFor(async () => {
        const currentTheme = getThemeFromLabel();
        await expect(currentTheme).toBe(initialTheme);
      });
    });

    await step("Verify all three themes were visited", async () => {
      await expect(themesVisited.length).toBe(3);
      await expect(themesVisited).toContain("System");
      await expect(themesVisited).toContain("Light");
      await expect(themesVisited).toContain("Dark");
    });
  }
});

/**
 * Tests keyboard accessibility with Enter key.
 * Verifies Enter key press cycles through themes.
 */
export const KeyboardAccessibilityEnter = meta.story({
  tags: ["test-only"],
  play: async ({ canvas, step, userEvent }) => {
    const button = canvas.getByRole("button");

    const getThemeFromLabel = () => {
      const label = button.getAttribute("aria-label") || "";
      const match = label.match(/Current: (System|Light|Dark) theme/);
      return match ? match[1] : null;
    };

    const initialTheme = getThemeFromLabel();

    await step("Focus the button", async () => {
      button.focus();
      await expect(button).toHaveFocus();
    });

    await step("Press Enter to cycle theme", async () => {
      await userEvent.keyboard("{Enter}");
      await waitFor(async () => {
        const newTheme = getThemeFromLabel();
        await expect(newTheme).not.toBe(initialTheme);
      });
    });

    const secondTheme = getThemeFromLabel();

    await step("Press Enter again to cycle to next theme", async () => {
      await userEvent.keyboard("{Enter}");
      await waitFor(async () => {
        const newTheme = getThemeFromLabel();
        await expect(newTheme).not.toBe(secondTheme);
      });
    });
  }
});

/**
 * Tests keyboard accessibility with Space key.
 * Verifies Space key press cycles through themes.
 */
export const KeyboardAccessibilitySpace = meta.story({
  tags: ["test-only"],
  play: async ({ canvas, step, userEvent }) => {
    const button = canvas.getByRole("button");

    const getThemeFromLabel = () => {
      const label = button.getAttribute("aria-label") || "";
      const match = label.match(/Current: (System|Light|Dark) theme/);
      return match ? match[1] : null;
    };

    const initialTheme = getThemeFromLabel();

    await step("Focus the button", async () => {
      button.focus();
      await expect(button).toHaveFocus();
    });

    await step("Press Space to cycle theme", async () => {
      await userEvent.keyboard(" ");
      await waitFor(async () => {
        const newTheme = getThemeFromLabel();
        await expect(newTheme).not.toBe(initialTheme);
      });
    });

    const secondTheme = getThemeFromLabel();

    await step("Press Space again to cycle to next theme", async () => {
      await userEvent.keyboard(" ");
      await waitFor(async () => {
        const newTheme = getThemeFromLabel();
        await expect(newTheme).not.toBe(secondTheme);
      });
    });
  }
});

/**
 * Tests tooltip display on hover.
 * Verifies tooltip appears when hovering over the button.
 */
export const TooltipDisplayOnHover = meta.story({
  tags: ["test-only"],
  play: async ({ canvas, canvasElement, step, userEvent }) => {
    const button = canvas.getByRole("button");
    const portal = within(canvasElement.parentElement as HTMLElement);

    await step("Hover over the theme toggle button", async () => {
      await userEvent.hover(button);
    });

    await step("Verify tooltip appears", async () => {
      await waitFor(async () => {
        const tooltip = await portal.findByRole("tooltip");
        await expect(tooltip).toBeInTheDocument();
      });
    });

    await step("Verify tooltip closes on unhover", async () => {
      await userEvent.unhover(button);

      // Wait for tooltip to close
      await waitFor(async () => {
        const tooltip = portal.queryByRole("tooltip");
        // Tooltip should be closed or have closed state
        if (tooltip) {
          await expect(tooltip).toHaveAttribute("data-state", "closed");
        }
      });
    });
  }
});

/**
 * Tests that tooltip shows theme name matching aria-label.
 * Verifies tooltip content is consistent with button state.
 */
export const TooltipShowsThemeName = meta.story({
  tags: ["test-only"],
  play: async ({ canvas, canvasElement, step, userEvent }) => {
    const button = canvas.getByRole("button");
    const portal = within(canvasElement.parentElement as HTMLElement);

    const getThemeFromLabel = () => {
      const label = button.getAttribute("aria-label") || "";
      const match = label.match(/Current: (System|Light|Dark) theme/);
      return match ? match[1] : null;
    };

    await step("Hover and verify tooltip shows current theme", async () => {
      const currentTheme = getThemeFromLabel();
      await userEvent.hover(button);

      await waitFor(async () => {
        const tooltip = await portal.findByRole("tooltip");
        await expect(tooltip).toHaveTextContent(`${currentTheme} theme`);
      });

      await userEvent.unhover(button);

      // Wait for tooltip to close before proceeding
      await waitFor(async () => {
        const tooltip = portal.queryByRole("tooltip");
        if (tooltip) {
          await expect(tooltip).toHaveAttribute("data-state", "closed");
        }
      });
    });

    await step("Click to change theme", async () => {
      const initialTheme = getThemeFromLabel();
      await userEvent.click(button);

      await waitFor(async () => {
        const newTheme = getThemeFromLabel();
        await expect(newTheme).not.toBe(initialTheme);
      });
    });

    await step("Hover and verify tooltip shows updated theme", async () => {
      const currentTheme = getThemeFromLabel();
      await userEvent.hover(button);

      await waitFor(async () => {
        const tooltip = await portal.findByRole("tooltip");
        await expect(tooltip).toHaveTextContent(`${currentTheme} theme`);
      });
    });
  }
});

/**
 * Tests accessible aria-labels are properly set.
 * Verifies aria-label includes current theme and next theme information.
 */
export const AccessibleAriaLabels = meta.story({
  tags: ["test-only"],
  play: async ({ canvas, step, userEvent }) => {
    const button = canvas.getByRole("button");

    const getThemeInfo = () => {
      const label = button.getAttribute("aria-label") || "";
      const currentMatch = label.match(/Current: (System|Light|Dark) theme/);
      const nextMatch = label.match(/Click to switch to (System|Light|Dark) theme/);
      return {
        current: currentMatch ? currentMatch[1] : null,
        next: nextMatch ? nextMatch[1] : null
      };
    };

    await step("Verify aria-label contains current and next theme info", async () => {
      const { current, next } = getThemeInfo();
      await expect(current).toBeTruthy();
      await expect(next).toBeTruthy();
      await expect(current).not.toBe(next);
    });

    await step("Click and verify aria-label updates correctly", async () => {
      const beforeClick = getThemeInfo();
      await userEvent.click(button);

      await waitFor(async () => {
        const afterClick = getThemeInfo();
        // The new current should be what was previously the next
        await expect(afterClick.current).toBe(beforeClick.next);
        // The new next should be different from new current
        await expect(afterClick.next).not.toBe(afterClick.current);
      });
    });

    await step("Click again and verify aria-label continues updating", async () => {
      const beforeClick = getThemeInfo();
      await userEvent.click(button);

      await waitFor(async () => {
        const afterClick = getThemeInfo();
        await expect(afterClick.current).toBe(beforeClick.next);
      });
    });
  }
});

/**
 * Tests that icon changes when theme changes.
 * Verifies visual feedback updates with theme state.
 */
export const IconChangesWithTheme = meta.story({
  tags: ["test-only"],
  play: async ({ canvas, step, userEvent }) => {
    const button = canvas.getByRole("button");

    await step("Verify icon is present", async () => {
      const svg = button.querySelector("svg");
      await expect(svg).toBeInTheDocument();
    });

    await step("Click and verify icon updates (SVG content changes)", async () => {
      const initialIcon = button.querySelector("svg")?.outerHTML;

      await userEvent.click(button);

      await waitFor(async () => {
        const newIcon = button.querySelector("svg")?.outerHTML;
        // The SVG should change as different icons are rendered for different themes
        await expect(newIcon).not.toBe(initialIcon);
      });
    });
  }
});
