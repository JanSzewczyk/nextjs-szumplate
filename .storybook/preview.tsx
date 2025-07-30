import { type Preview } from "@storybook/react";
import { DarkModeDocsContainer } from "@storybook-community/storybook-dark-mode";

import dark from "./theme/dark";
import light from "./theme/light";

import "../app/globals.css";

export default {
  parameters: {
    darkMode: {
      dark,
      light,
      current: "dark",
      classTarget: "html",
      stylePreview: true
    },
    nextjs: {
      appDirectory: true
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    docs: {
      controls: {
        sort: "requiredFirst"
      },
      container: DarkModeDocsContainer
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
