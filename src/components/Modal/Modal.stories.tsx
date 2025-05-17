import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Modal } from ".";
import { Button } from "../Button";
import { ActionsWrapper, StyledDialogTitle } from "./Modal.styled";

const meta: Meta<typeof Modal> = {
  title: "Modal",
  component: Modal,
};

export default meta;
type Story = StoryObj<typeof Modal>;

const ModalStory = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button variant="primary" size="medium" onClick={() => setIsOpen(true)}>
        Open
      </Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <StyledDialogTitle>Modal Title</StyledDialogTitle>
        <p>Modal content</p>
        <ActionsWrapper>
          <Button
            variant="secondary"
            size="medium"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="medium"
            onClick={() => setIsOpen(false)}
          >
            Save
          </Button>
        </ActionsWrapper>
      </Modal>
    </>
  );
};

export const Primary: Story = {
  render: () => <ModalStory />,
};
