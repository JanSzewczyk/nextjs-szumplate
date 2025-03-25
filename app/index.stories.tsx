import { type Meta, type StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import Page from "~/app/page";

const meta = {
  title: "App/Home Page",
  component: Page,
  parameters: {
    nextjs: {
      router: {
        appDirectory: true,
        pathname: "/"
      }
    }
  }
} satisfies Meta<typeof Page>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Home Page 2 3234234",
  async play({ canvas }) {
    await expect(canvas.getByRole("heading", { name: /Next App Template/ })).toBeInTheDocument();
    await expect(canvas.getByText("by Szum-Tech")).toBeInTheDocument();
    await expect(canvas.getByRole("button", { name: /See Repo/ })).toBeInTheDocument();
  }
};
