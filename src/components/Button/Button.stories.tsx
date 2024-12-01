import type { Meta, StoryObj } from "@storybook/react";
import { Button } from ".";
import { Buttons } from "./Button.styled";

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  render: () => {
    return (
      <Buttons>
        <Button variant="primary" size="small">
          hey
        </Button>
        <Button variant="primary" size="medium">
          hey
        </Button>
        <Button variant="primary" size="large">
          hey
        </Button>
      </Buttons>
    );
  },
};

export const Secondary: Story = {
  render: () => {
    return (
      <Buttons>
        <Button variant="secondary" size="small">
          hey
        </Button>
        <Button variant="secondary" size="medium">
          hey
        </Button>
        <Button variant="secondary" size="large">
          hey
        </Button>
      </Buttons>
    );
  },
};
