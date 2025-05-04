import { Pack } from "api/packs";
import { Button } from "components/Button";
import { Field } from "components/Field";
import { Input } from "components/Input";
import { ActionsWrapper, Modal } from "components/Modal";
import { Select } from "components/Select";
import { HeadingTwo } from "components/Typography";
import { useEffect, useState } from "react";
import { Unit } from "types/Unit";
import { FieldsWrapper } from "./PackModal.styled";

type PackModalProps = {
  isOpen: boolean;
  initialProps: Partial<Pack> | null;
  onClose: () => void;
  onSubmit: (pack: Partial<Pack>) => void;
};

export const PackModal = ({
  isOpen,
  initialProps,
  onClose,
  onSubmit,
}: PackModalProps) => {
  // form state
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState<string | null | undefined>("");
  const [unit, setUnit] = useState<Unit | undefined>(Unit.LB);

  useEffect(() => {
    if (!!initialProps) {
      setIsEdit(true);
      setName(initialProps.name);
      setUnit(initialProps.unit);
    } else {
      setIsEdit(false);
      setName("");
      setUnit(Unit.LB);
    }
  }, [initialProps?.name]);

  const resetFormState = () => {
    setName("");
    setUnit(Unit.LB);
  };

  // create pack ---------------------------------------------------------------
  const addPack = async () => {
    await onSubmit({
      ...initialProps,
      name,
      unit,
    });
    resetFormState();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <HeadingTwo as="h2">
        {isEdit ? `Edit ${initialProps?.name}` : "Create a new pack"}
      </HeadingTwo>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          addPack();
        }}
        role="form"
      >
        <FieldsWrapper>
          <Field label="Pack name">
            <Input
              type="text"
              name="Pack name"
              value={name || ""}
              placeholder="name"
              onChange={(e) => setName(e.target.value)}
            />
          </Field>
          <Field label="Unit">
            <Select
              variant="primary"
              buttonSize="large"
              onChange={(e) => setUnit(e.target.value as Unit)}
              value={unit}
            >
              <option value={Unit.OZ}>oz</option>
              <option value={Unit.LB}>lb</option>
              <option value={Unit.G}>g</option>
              <option value={Unit.KG}>kg</option>
            </Select>
          </Field>
        </FieldsWrapper>
        <ActionsWrapper>
          <Button variant="secondary" size="large" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" size="large">
            Save
          </Button>
        </ActionsWrapper>
      </form>
    </Modal>
  );
};
