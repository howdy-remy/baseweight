import { Button } from "components/Button";
import { ActionsWrapper, Modal } from "components/Modal";
import { HeadingTwo, TextSansRegular } from "components/Typography";

type ConfirmDeleteGearItemModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
};

export const ConfirmDeleteGearItemModal = ({
  isOpen,
  onClose,
  onSubmit,
}: ConfirmDeleteGearItemModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <HeadingTwo as="h1">Confirm delete</HeadingTwo>
      <TextSansRegular>
        Are you sure you want to delete this item? This will remove the item
        from all packs it has been associated with. This action cannot be
        undone.
      </TextSansRegular>
      <ActionsWrapper>
        <Button variant="secondary" size="medium" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" size="medium" onClick={onSubmit}>
          Delete
        </Button>
      </ActionsWrapper>
    </Modal>
  );
};
