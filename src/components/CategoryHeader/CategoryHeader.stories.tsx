import type { Meta, StoryObj } from "@storybook/react";
import { CategoryHeader } from "./CategoryHeader";

const meta: Meta<typeof CategoryHeader> = {
  title: "CategoryHeader",
  component: CategoryHeader,
};

export default meta;
type Story = StoryObj<typeof CategoryHeader>;

export const Base: Story = {
  args: {
    categoryName: "Category",
    color: "#abcabc",
    quantity: 100,
    weight: 88.88,
    weightUnit: "oz",
  },
};
