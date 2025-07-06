import { type Preview } from "@storybook/react";

import darkTheme from "./theme/dark";

import "~/app/globals.css";

export default {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    docs: {
      theme: darkTheme,
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
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Global theme for components",
      defaultValue: "dark",
      toolbar: {
        icon: "circlehollow",
        items: [
          { value: "light", icon: "circlehollow", title: "Light" },
          { value: "dark", icon: "circle", title: "Dark" }
        ],
        showName: true,
        dynamicTitle: true
      }
    }
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme;
      // Apply theme class to html
      document.documentElement.setAttribute("class", theme);
      // Also wrap the story with theme context if needed
      return (
        <div className={theme}>
          <Story />
        </div>
      );
    }
  ],
} satisfies Preview;
