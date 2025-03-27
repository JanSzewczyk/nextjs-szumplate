import { type Preview } from "@storybook/react";

import { DocsContainer } from "./components/docs-container";
import darkTheme from "./theme/dark";
import lightTheme from "./theme/light";

import "~/app/globals.css";

export default {
  parameters: {
    darkMode: {
      current: "light",
      classTarget: "html",
      stylePreview: true,
      // Override the default dark theme
      dark: darkTheme,
      // Override the default light theme
      light: lightTheme
    },
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    docs: {
      container: DocsContainer,
      controls: {
        sort: "requiredFirst"
      }
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo"
    }
  },
  decorators: []
} satisfies Preview;
