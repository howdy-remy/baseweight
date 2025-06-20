import type { Meta, StoryObj } from "@storybook/react";
import { GearItem } from "./GearItem";
import { Unit } from "types/Unit";

const meta: Meta<typeof GearItem> = {
  title: "GearItem",
  component: GearItem,
};

export default meta;
type Story = StoryObj<typeof GearItem>;

export const Base: Story = {
  args: {
    item: {
      id: 1,
      type: "Type",
      description: "Description",
      weightInGrams: 88.88,
      unit: Unit.G,
    },
  },
};
