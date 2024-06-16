import { type Meta, type StoryObj } from "@storybook/react";

import Page from "~/app/page";

const meta = {
  title: "Pages/Example",
  component: Page,
  tags: ["autodocs"]
} satisfies Meta<typeof Page>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
