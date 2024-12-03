import { FormEventHandler, useState } from "react";
import { Input } from "../Input";
import { Field } from "../Field";
import { Button } from "../Button";

export type OnSubmitItemProps = {
  type: string;
  description: string;
  weightInGrams: number;
  quantity: number;
};

type CreateItemFormProps = {
  onSubmit: (item: OnSubmitItemProps) => void;
};

export const CreateItemForm = ({ onSubmit }: CreateItemFormProps) => {
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [weightInGrams, setWeightInGrams] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const handleOnSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    await onSubmit({
      type,
      description,
      weightInGrams,
      quantity,
    });
    setType("");
    setDescription("");
    setWeightInGrams(0);
    setQuantity(0);
  };

  return (
    <form onSubmit={handleOnSubmit} className="form-widget">
      <Field label="Type">
        <Input
          type="text"
          name="type"
          value={type}
          placeholder="type"
          onChange={(e) => setType(e.target.value)}
        />
      </Field>
      <Field label="Description">
        <Input
          type="text"
          name="description"
          value={description}
          placeholder="description"
          onChange={(e) => setDescription(e.target.value)}
        />
      </Field>
      <Field label="Weight">
        <Input
          type="number"
          name="weight"
          value={weightInGrams}
          placeholder="weight"
          onChange={(e) => setWeightInGrams(+e.target.value)}
        />
      </Field>
      <Field label="Quantity">
        <Input
          type="number"
          name="quantity"
          value={quantity}
          placeholder="quantity"
          onChange={(e) => setQuantity(+e.target.value)}
        />
      </Field>
      <Button variant="primary" type="submit" size="large">
        Add Item
      </Button>
    </form>
  );
};
