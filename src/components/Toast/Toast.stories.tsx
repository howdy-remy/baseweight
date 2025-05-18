import type { Meta, StoryObj } from "@storybook/react";

import { Toast } from ".";
import { Toasts } from "./Toast.styled";

const meta: Meta<typeof Toast> = {
  title: "Toast",
  component: Toast,
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Primary: Story = {
  render: () => (
    <Toasts>
      <Toast id="a">first message!</Toast>
      <Toast id="b">share link copied!</Toast>
      <Toast id="c">test!</Toast>
    </Toasts>
  ),
};
