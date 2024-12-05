import { ChangeEvent, useState } from "react";
import { Button } from "../Button";
import { Input } from "../Input";

type AddItemToPackProps = {
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
};
export const AddItemToPack = ({ onSearch }: AddItemToPackProps) => {
  const [isAddMode, setIsAddMode] = useState(false);

  if (isAddMode) {
    return <Input onChange={onSearch} placeholder="Search for an item..." />;
  }
  return (
    <Button
      variant="secondary"
      size="large"
      expandWidth
      onClick={(e) => setIsAddMode(true)}
    >
      Add item
    </Button>
  );
};
