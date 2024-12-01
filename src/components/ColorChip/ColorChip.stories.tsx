import type { Meta, StoryObj } from "@storybook/react";
import { ColorChip } from "./ColorChip";
import { Chips } from "./ColorChip.styled";

const meta: Meta<typeof ColorChip> = {
  title: "Tokens/Colors",
  component: ColorChip,
};

export default meta;
type Story = StoryObj<typeof ColorChip>;

export const Colors: Story = {
  render: () => {
    return (
      <Chips>
        <ColorChip color="moss" isLight />
        <ColorChip color="lichen" />
        <ColorChip color="flour" />
        <ColorChip color="black" isLight />
        <ColorChip color="white" />
      </Chips>
    );
  },
};
