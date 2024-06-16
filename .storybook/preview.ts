import darkTheme from "./theme/dark";
import lightTheme from "./theme/light";

import "~/app/globals.css";

import { DocsContainer } from "./components/DocsContainer";
import { Preview } from "@storybook/react";

export default {
  parameters: {
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    darkMode: {
      classTarget: "html",
      current: "light",
      stylePreview: true,
      // Override the default dark theme
      dark: darkTheme,
      // Override the default light theme
      light: lightTheme
    },
    docs: {
      controls: {
        sort: "requiredFirst"
      },
      container: DocsContainer
    },
    layout: "centered"
  },
  decorators: [],
  tags: ["autodocs"]
} satisfies Preview;
