import * as React from "react";

import addonA11y from "@storybook/addon-a11y";
import addonDocs from "@storybook/addon-docs";
import { DocsContainer, type DocsContainerProps } from "@storybook/addon-docs/blocks";
import { definePreview } from "@storybook/nextjs-vite";
import { DARK_MODE_EVENT_NAME } from "@storybook-community/storybook-dark-mode";
import { ThemeProvider } from "~/components/providers/theme-provider";

import dark from "./theme/dark";
import light from "./theme/light";

import "../app/globals.css";

export function DarkModeDocsContainer(props: DocsContainerProps) {
  const [isDark, setDark] = React.useState(true);

  React.useEffect(() => {
    props.context.channel.on(DARK_MODE_EVENT_NAME, setDark);

    return () => props.context.channel.removeListener(DARK_MODE_EVENT_NAME, setDark);
  }, [props.context.channel]);
  return <DocsContainer {...props} theme={isDark ? dark : light} />;
}

/**
 * Storybook decorator that provides theme context for components.
 * Syncs with Storybook's dark mode addon.
 */
function ThemeDecorator({ children }: { children: React.ReactNode }) {
  const [isDark, setDark] = React.useState(true);

  React.useEffect(() => {
    // Listen for Storybook dark mode changes
    const channel = (
      window as unknown as {
        __STORYBOOK_ADDONS_CHANNEL__?: {
          on: (event: string, callback: (isDark: boolean) => void) => void;
          removeListener: (event: string, callback: (isDark: boolean) => void) => void;
        };
      }
    ).__STORYBOOK_ADDONS_CHANNEL__;
    if (channel) {
      channel.on(DARK_MODE_EVENT_NAME, setDark);
      return () => channel.removeListener(DARK_MODE_EVENT_NAME, setDark);
    }
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={isDark ? "dark" : "light"}
      forcedTheme={isDark ? "dark" : "light"}
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}

export default definePreview({
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
      test: "todo",
      options: {
        xpath: true
      }
    }
  },
  decorators: [
    (Story) => (
      <ThemeDecorator>
        <Story />
      </ThemeDecorator>
    )
  ]  ,addons: [addonA11y(), addonDocs()]
});
