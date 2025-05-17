import type { Meta, StoryObj } from "@storybook/react";
import { Pack } from "./Pack";
import { Unit } from "types/Unit";
import { withRouter } from "storybook-addon-remix-react-router";

const meta: Meta<typeof Pack> = {
  title: "Pack",
  component: Pack,
  decorators: [withRouter],
};

export default meta;
type Story = StoryObj<typeof Pack>;

const PackStory = () => {
  return (
    <Pack
      pack={{
        id: 1,
        name: "Example Pack",
        description: "This is an example pack for storybook",
        unit: Unit.LB,
        weight: 100,
      }}
    />
  );
};

export const Base: Story = {
  render: () => <PackStory />,
};
