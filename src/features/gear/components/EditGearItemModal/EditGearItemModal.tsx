import { FormEventHandler, useState } from "react";
import { Unit } from "types/Unit";

import { Item } from "api/items";
import {
  convertGramsToUnit,
  convertUnitToGrams,
} from "utils/unit-conversion/unit-conversion";

import { ActionsWrapper, Modal } from "components/Modal";
import { Field, StackedFields } from "components/Field";
import { Input } from "components/Input";
import { Button } from "components/Button";
import { HeadingTwo } from "components/Typography";
import { Select } from "components/Select";

import { FieldsWrapper } from "./EditGearItemModal.styled";

export type OnSubmitItemProps = {
  id: number;
  type: string;
  description: string;
  weightInGrams: number;
  unit: Unit;
};

type EditGearItemModalProps = {
  item: Item | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (item: OnSubmitItemProps) => Promise<void>;
};

export const EditGearItemModal: React.FC<EditGearItemModalProps> = ({
  item,
  isOpen,
  onClose,
  onSubmit,
}: EditGearItemModalProps) => {
  if (!item) {
    return null;
  }

  // form state
  const [type, setType] = useState(item.type);
  const [description, setDescription] = useState(item.description);
  const [weight, setWeight] = useState(
    convertGramsToUnit(item.unit, item.weightInGrams || 0),
  );
  const [unit, setUnit] = useState<Unit>(item.unit);

  const resetFormState = () => {
    setType("");
    setDescription("");
    setWeight(0);
    setUnit(Unit.G);
  };

  // submit handler ------------------------------------------------------------
  const handleOnSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const weightInGrams = convertUnitToGrams(unit, weight || 0);
    await onSubmit({
      id: item.id,
      type: type || "",
      description: description || "",
      weightInGrams,
      unit,
    });
    resetFormState();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <HeadingTwo>Edit item</HeadingTwo>
      <form onSubmit={handleOnSubmit}>
        <StackedFields>
          <Field label="Type" description="e.g. Tent">
            <Input
              type="text"
              name="type"
              value={type || ""}
              placeholder="type"
              onChange={(e) => setType(e.target.value)}
            />
          </Field>
          <Field
            label="Description"
            description="e.g. Big Agnes: Tiger Wall UL3"
          >
            <Input
              type="text"
              name="description"
              value={description || ""}
              placeholder="description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </Field>
          <FieldsWrapper>
            <Field label="Weight">
              <Input
                type="number"
                name="weight"
                value={weight}
                placeholder="weight"
                onChange={(e) => setWeight(+e.target.value)}
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
        </StackedFields>
        <ActionsWrapper>
          <Button variant="secondary" size="large" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" size="large">
            Edit Item
          </Button>
        </ActionsWrapper>
      </form>
    </Modal>
  );
};
