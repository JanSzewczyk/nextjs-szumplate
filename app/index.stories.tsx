import { type Meta, type StoryObj } from "@storybook/react";
import { expect, within } from "storybook/test";
import RootLayout from "~/app/layout";
import Page from "~/app/page";

const meta = {
  title: "App/Home Page",
  component: Page,
  parameters: {
    nextjs: {
      router: {
        pathname: "/"
      }
    }
  },
  decorators: [
    (Story) => (
      <RootLayout>
        <Story />
      </RootLayout>
    )
  ]
} satisfies Meta<typeof Page>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Home Page",
  tags: ["test-only"],
  async play({ canvasElement }) {
    const canvas = await within(canvasElement);
    await expect(canvas.getByRole("heading", { name: /Next App Template/ })).toBeInTheDocument();
    await expect(canvas.getByText("by Szum-Tech")).toBeInTheDocument();
    await expect(canvas.getByRole("button", { name: /See Repo/ })).toBeInTheDocument();
  }
};
