import type { Meta, StoryObj } from "@storybook/react";
import { TextArea } from ".";

const meta: Meta<typeof TextArea> = {
  title: "TextArea",
  component: TextArea,
};

export default meta;
type Story = StoryObj<typeof TextArea>;

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
