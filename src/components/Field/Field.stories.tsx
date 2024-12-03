import type { Meta, StoryObj } from "@storybook/react";
import { Field } from ".";
import { Input } from "../Input";

const meta: Meta<typeof Field> = {
  title: "Field",
  component: Field,
};

export default meta;
type Story = StoryObj<typeof Field>;

export const Primary: Story = {
  args: {
    label: "Label text",
    children: <Input />,
  },
};

export const WithDescription: Story = {
  args: {
    label: "Label text",
    description: "This is a field description",
    children: <Input />,
  },
};
