import type { Meta, StoryObj } from "@storybook/react";
import { Category } from "./Category";

const meta: Meta<typeof Category> = {
  title: "Category",
  component: Category,
};

export default meta;
type Story = StoryObj<typeof Category>;

export const Base: Story = {
  args: {
    categoryName: "Category",
    color: "#abcabc",
    quantity: 100,
    weight: 88.88,
    weightUnit: "oz",
  },
};
