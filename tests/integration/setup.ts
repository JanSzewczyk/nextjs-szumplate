import { beforeAll } from "vitest";

// eslint-disable-next-line import/namespace
import * as a11yAddonAnnotations from "@storybook/addon-a11y/preview";
import { setProjectAnnotations } from "@storybook/nextjs-vite";

import * as projectAnnotations from "../../.storybook/preview";

// This is an important step to apply the right configuration when testing your stories.
// More info at: https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest#setprojectannotations
const project = setProjectAnnotations([projectAnnotations, a11yAddonAnnotations]);

beforeAll(project.beforeAll);
