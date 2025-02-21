import { FormEventHandler, useEffect, useState } from "react";
import { Unit } from "types/Unit";

import { ActionsWrapper, Modal } from "components/Modal";
import { Field, StackedFields } from "components/Field";
import { Input } from "components/Input";
import { Button } from "components/Button";
import { HeadingTwo } from "components/Typography";
import { Select } from "components/Select";

import { FieldsWrapper } from "./CreateItemModal.styled";
import { convertUnitToGrams } from "utils/unit-conversion/unit-conversion";

export type OnSubmitItemProps = {
  type: string;
  description: string;
  weightInGrams: number;
  unit: Unit;
  quantity: number;
};

type CreateItemModalProps = {
  category: string;
  initialType?: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (item: OnSubmitItemProps) => void;
};

export const CreateItemModal: React.FC<CreateItemModalProps> = ({
  category,
  initialType = "",
  isOpen,
  onClose,
  onSubmit,
}: CreateItemModalProps) => {
  // form state
  const [type, setType] = useState(initialType ?? "");
  const [description, setDescription] = useState("");
  const [weight, setWeight] = useState(0);
  const [unit, setUnit] = useState<Unit>(Unit.G);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    setType(initialType);
  }, [initialType]);

  const resetFormState = () => {
    setType("");
    setDescription("");
    setWeight(0);
    setUnit(Unit.G);
    setQuantity(0);
  };

  // submit handler ------------------------------------------------------------
  const handleOnSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const weightInGrams = convertUnitToGrams(unit, weight);
    await onSubmit({
      type,
      description,
      weightInGrams,
      unit,
      quantity,
    });
    resetFormState();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <HeadingTwo>Create item and add to {category}</HeadingTwo>
      <form onSubmit={handleOnSubmit}>
        <StackedFields>
          <Field label="Type" description="e.g. Tent">
            <Input
              type="text"
              name="type"
              value={type}
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
              value={description}
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
            <Field label="Quantity">
              <Input
                type="number"
                name="quantity"
                value={quantity}
                placeholder="quantity"
                onChange={(e) => setQuantity(+e.target.value)}
                min="0"
              />
            </Field>
          </FieldsWrapper>
        </StackedFields>
        <ActionsWrapper>
          <Button variant="secondary" size="large" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" size="large">
            Add Item
          </Button>
        </ActionsWrapper>
      </form>
    </Modal>
  );
};
