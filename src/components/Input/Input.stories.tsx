import type { Meta, StoryObj } from "@storybook/react";
import { Input } from ".";

const meta: Meta<typeof Input> = {
  title: "Input",
  component: Input,
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Primary: Story = {
  args: {
    placeholder: "placeholder text",
    type: "text",
    name: "name",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "placeholder text",
    type: "text",
    name: "name",
    isDisabled: true,
  },
};
