import { Dialog } from "@headlessui/react";
import { Scrim, StyledDialogPanel } from "./Modal.styled";

type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export const Modal = ({ children, isOpen = false, onClose }: ModalProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Scrim />
      <StyledDialogPanel>{children}</StyledDialogPanel>
    </Dialog>
  );
};
