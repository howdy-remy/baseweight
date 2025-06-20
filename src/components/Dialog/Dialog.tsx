import { Dialog as HeadlessDialog } from "@headlessui/react";
import { Scrim, StyledDialogPanel } from "./Dialog.styled";
import { HeadingThree, TextSansRegular } from "components/Typography";
import { Button } from "components/Button";

type DialogProps = {
  isOpen: boolean;
  title: string;
  content: string;
  buttonText: string;
  onClose: () => void;
  onConfirm?: () => void;
};

export const Dialog = ({
  isOpen,
  title,
  content,
  buttonText,
  onClose,
  onConfirm,
}: DialogProps) => {
  return (
    <HeadlessDialog open={isOpen} onClose={onClose}>
      <Scrim />
      <StyledDialogPanel>
        <HeadingThree>{title}</HeadingThree>
        <TextSansRegular>{content}</TextSansRegular>
        <Button variant="primary" size="medium" onClick={onConfirm}>
          {buttonText}
        </Button>
      </StyledDialogPanel>
    </HeadlessDialog>
  );
};
