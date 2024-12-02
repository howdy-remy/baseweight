import type { Meta, StoryObj } from "@storybook/react";
import { Dropdown } from "./Dropdown";
import { IconButton } from "../IconButton";

const meta: Meta<typeof Dropdown> = {
  title: "Dropdown",
  component: Dropdown,
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Base: Story = {
  args: {
    label: "Dropdown",
    items: [
      {
        label: "Item 1",
        onClick: () => console.log("Item 1"),
      },
      {
        label: "Item 2",
        onClick: () => console.log("Item 2"),
      },
      {
        label: "Item 3",
        onClick: () => console.log("Item 3"),
      },
    ],
  },
};

export const CustomAnchor: Story = {
  args: {
    label: "Dropdown",
    useIconButton: true,
    items: [
      {
        label: "Edit",
        onClick: () => console.log("Item 1"),
      },
      {
        label: "Remove",
        onClick: () => console.log("Item 2"),
      },
    ],
  },
};
