import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Dialog } from ".";
import { Button } from "../Button";

const meta: Meta<typeof Dialog> = {
  title: "Dialog",
  component: Dialog,
};

export default meta;
type Story = StoryObj<typeof Dialog>;

const DialogStory = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button variant="primary" size="medium" onClick={() => setIsOpen(true)}>
        Open
      </Button>
      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Dialog title"
        content="Dialog content"
        buttonText="Close"
        onConfirm={() => setIsOpen(false)}
      ></Dialog>
    </>
  );
};

export const Primary: Story = {
  render: () => <DialogStory />,
};
