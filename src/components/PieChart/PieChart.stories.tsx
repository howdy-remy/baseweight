import type { Meta, StoryObj } from "@storybook/react";
import { PieChart } from "./PieChart";

const meta: Meta<typeof PieChart> = {
  title: "PieChart",
  component: PieChart,
};

export default meta;
type Story = StoryObj<typeof PieChart>;

export const Base: Story = {
  args: {
    data: [
      { label: "A", value: 10 },
      { label: "B", value: 20 },
      { label: "C", value: 30 },
      { label: "D", value: 40 },
    ],
    width: 200,
    height: 200,
    colors: ["#ff0000", "#00ff00", "#0000ff", "#ffff00"],
  },
};
