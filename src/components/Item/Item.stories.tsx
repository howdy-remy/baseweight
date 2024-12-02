import type { Meta, StoryObj } from "@storybook/react";
import { Item } from "./Item";

const meta: Meta<typeof Item> = {
  title: "Item",
  component: Item,
};

export default meta;
type Story = StoryObj<typeof Item>;

export const Base: Story = {
  args: {
    item: {
      id: 1,
      type: "Type",
      description: "Description",
      weightInGrams: 88.88,
      quantity: 100,
    },
  },
};
