import type { Meta, StoryObj } from "@storybook/react";
import { IconButton } from ".";
import { IconButtons } from "./IconButton.styled";

const meta: Meta<typeof IconButton> = {
  title: "Button/Icon",
  component: IconButton,
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Primary: Story = {
  render: () => {
    return (
      <IconButtons>
        <IconButton icon="caretdown" variant="primary" />
        <IconButton icon="chat" variant="primary" />
        <IconButton icon="menu" variant="primary" />
        <IconButton icon="star" variant="primary" />
        <IconButton icon="x" variant="primary" />
      </IconButtons>
    );
  },
};

export const Secondary: Story = {
  render: () => {
    return (
      <IconButtons>
        <IconButton icon="caretdown" variant="secondary" />
        <IconButton icon="chat" variant="secondary" />
        <IconButton icon="menu" variant="secondary" />
        <IconButton icon="star" variant="secondary" />
        <IconButton icon="x" variant="secondary" />
      </IconButtons>
    );
  },
};
