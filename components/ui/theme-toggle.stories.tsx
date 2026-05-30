import { expect, screen, waitFor } from "storybook/test";
import preview from "~/.storybook/preview";
import { ThemeToggle } from "./theme-toggle";

const meta = preview.meta({
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
  },
  title: "Components/UI/Theme Toggle"
});

export const ThemeToggleStory = meta.story({ name: "Theme Toggle" });

ThemeToggleStory.test("Button — role, enabled state, and focusability", async ({ canvas, step }) => {
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

ThemeToggleStory.test("Initial state — icon and aria-label present", async ({ canvas, step }) => {
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
});

ThemeToggleStory.test("Full theme cycle — visits all three themes", async ({ canvas, step, userEvent }) => {
  const button = canvas.getByRole("button");
  const themesVisited: Array<string> = [];

  const getThemeFromLabel = (): string => {
    const label = button.getAttribute("aria-label") || "";
    const match = label.match(/Current: (System|Light|Dark) theme/);
    return match?.[1] ?? "Unknown";
  };

  const initialTheme = getThemeFromLabel();
  themesVisited.push(initialTheme);

  await step("Click three times to complete full cycle", async () => {
    await userEvent.click(button);
    await waitFor(() => {
      const theme = getThemeFromLabel();
      if (!themesVisited.includes(theme)) {
        themesVisited.push(theme);
      }
    });

    await userEvent.click(button);
    await waitFor(() => {
      const theme = getThemeFromLabel();
      if (!themesVisited.includes(theme)) {
        themesVisited.push(theme);
      }
    });

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
});

ThemeToggleStory.test("Keyboard — Enter key cycles theme", async ({ canvas, step, userEvent }) => {
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
});

ThemeToggleStory.test("Keyboard — Space key cycles theme", async ({ canvas, step, userEvent }) => {
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
});

ThemeToggleStory.test("Tooltip — appears on hover and closes on unhover", async ({ canvas, step, userEvent }) => {
  const button = canvas.getByRole("button");

  await step("Hover over the theme toggle button", async () => {
    await userEvent.hover(button);
  });

  await step("Verify tooltip appears", async () => {
    await waitFor(async () => {
      const tooltip = await screen.findByRole("tooltip");
      await expect(tooltip).toBeInTheDocument();
    });
  });

  await step("Verify tooltip closes on unhover", async () => {
    await userEvent.unhover(button);

    await waitFor(async () => {
      const tooltip = screen.queryByRole("tooltip");
      if (tooltip) {
        await expect(tooltip).toHaveAttribute("data-state", "closed");
      }
    });
  });
});

ThemeToggleStory.test("Tooltip — shows current theme name", async ({ canvas, step, userEvent }) => {
  const button = canvas.getByRole("button");

  const getThemeFromLabel = () => {
    const label = button.getAttribute("aria-label") || "";
    const match = label.match(/Current: (System|Light|Dark) theme/);
    return match ? match[1] : null;
  };

  await step("Hover and verify tooltip shows current theme", async () => {
    const currentTheme = getThemeFromLabel();
    await userEvent.hover(button);

    await waitFor(async () => {
      const tooltip = await screen.findByRole("tooltip");
      await expect(tooltip).toHaveTextContent(`${currentTheme} theme`);
    });

    await userEvent.unhover(button);

    await waitFor(async () => {
      const tooltip = screen.queryByRole("tooltip");
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
      const tooltip = await screen.findByRole("tooltip");
      await expect(tooltip).toHaveTextContent(`${currentTheme} theme`);
    });
  });
});

ThemeToggleStory.test(
  "Aria labels — current and next theme info, update on click",
  async ({ canvas, step, userEvent }) => {
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
        await expect(afterClick.current).toBe(beforeClick.next);
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
);

ThemeToggleStory.test("Icon — changes when theme cycles", async ({ canvas, step, userEvent }) => {
  const button = canvas.getByRole("button");

  await step("Verify icon is present", async () => {
    const svg = button.querySelector("svg");
    await expect(svg).toBeInTheDocument();
  });

  await step("Click and verify icon updates", async () => {
    const initialIcon = button.querySelector("svg")?.outerHTML;

    await userEvent.click(button);

    await waitFor(async () => {
      const newIcon = button.querySelector("svg")?.outerHTML;
      await expect(newIcon).not.toBe(initialIcon);
    });
  });
});
