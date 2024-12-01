import { FormEventHandler, useState } from "react";

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
      <fieldset>
        <label htmlFor="type">type</label>
        <input
          id="type"
          type="text"
          value={type}
          placeholder="type"
          onChange={(e) => setType(e.target.value)}
        />
      </fieldset>
      <fieldset>
        <label htmlFor="description">description</label>
        <input
          id="description"
          type="text"
          value={description}
          placeholder="description"
          onChange={(e) => setDescription(e.target.value)}
        />
      </fieldset>
      <fieldset>
        <label htmlFor="weight">weight</label>
        <input
          id="weight"
          type="number"
          value={weightInGrams}
          onChange={(e) => setWeightInGrams(+e.target.value)}
          placeholder="weight"
        />
      </fieldset>
      <fieldset>
        <label htmlFor="quantity">quantity</label>
        <input
          id="quantity"
          type="number"
          value={quantity}
          placeholder="quantity"
          onChange={(e) => setQuantity(+e.target.value)}
        />
      </fieldset>
      <button className="button block primary" type="submit">
        Add Item
      </button>
    </form>
  );
};
