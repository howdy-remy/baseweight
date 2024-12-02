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
          Button/Primary/Small
        </Button>
        <Button variant="primary" size="medium">
          Button/Primary/Medium
        </Button>
        <Button variant="primary" size="large">
          Button/Primary/Large
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
          Button/Secondary/Small
        </Button>
        <Button variant="secondary" size="medium">
          Button/Secondary/Medium
        </Button>
        <Button variant="secondary" size="large">
          Button/Secondary/Large
        </Button>
      </Buttons>
    );
  },
};
