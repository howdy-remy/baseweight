import { Pack } from "api/packs";
import { Button } from "components/Button";
import { Field } from "components/Field";
import { Input } from "components/Input";
import { ActionsWrapper, Modal } from "components/Modal";
import { Select } from "components/Select";
import { HeadingTwo } from "components/Typography";
import { useEffect, useState } from "react";
import { Unit } from "types/Unit";
import { StyledForm } from "./PackModal.styled";
import { TextArea } from "components/TextArea";

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
  const [description, setDescription] = useState<string | null | undefined>("");
  const [unit, setUnit] = useState<Unit | undefined>(Unit.LB);

  useEffect(() => {
    if (!!initialProps) {
      setIsEdit(true);
      setName(initialProps.name);
      setUnit(initialProps.unit);
      setDescription(initialProps.description);
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
      description,
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
      <StyledForm
        onSubmit={(event) => {
          event.preventDefault();
          addPack();
        }}
        role="form"
      >
        <Field label="Pack name">
          <Input
            type="text"
            name="Pack name"
            value={name || ""}
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
          />
        </Field>
        <Field label="Pack description">
          <TextArea
            type="text"
            name="Pack description"
            value={description || ""}
            placeholder="description"
            onChange={(e) => setDescription(e.target.value)}
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
        <ActionsWrapper>
          <Button variant="secondary" size="large" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" size="large">
            Save
          </Button>
        </ActionsWrapper>
      </StyledForm>
    </Modal>
  );
};
