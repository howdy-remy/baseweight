import type { Meta, StoryObj } from "@storybook/react";
import { Select } from ".";
import { ChangeEvent } from "react";

const meta: Meta<typeof Select> = {
  title: "Select",
  component: Select,
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Primary: Story = {
  args: {
    name: "name",
  },
  render: () => (
    <Select
      buttonSize="large"
      variant="primary"
      expandWidth={false}
      onChange={(e: ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value);
      }}
    >
      <option value="oz">oz</option>
      <option value="lb">lb</option>
      <option value="g">g</option>
      <option value="kg">kg</option>
    </Select>
  ),
};
