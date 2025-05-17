import type { Meta, StoryObj } from "@storybook/react";
import { Item } from "./Item";
import { Unit } from "types/Unit";

const meta: Meta<typeof Item> = {
  title: "Item",
  component: Item,
};

export default meta;
type Story = StoryObj<typeof Item>;

export const Base: Story = {
  args: {
    categoryItem: {
      id: 1,
      item: {
        id: 1,
        type: "Type",
        description: "Description",
        weightInGrams: 88.88,
        unit: Unit.G,
      },
      order: 1,
      quantity: 100,
    },
  },
};
