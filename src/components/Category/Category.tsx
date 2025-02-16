import { DragHandle } from "../DragHandle";
import { Dropdown } from "../Dropdown";
import {
  CategoryColor,
  CategoryName,
  CategoryWrapper,
  Quantity,
  Weight,
} from "./Category.styled";

type CategoryProps = {
  categoryName?: string | null;
  color: string | null;
  quantity: number;
  weight: number;
  weightUnit: string;
};

export const Category = ({
  categoryName,
  color = "#abcabc",
  quantity,
  weight,
  weightUnit,
}: CategoryProps) => {
  const actions = [
    {
      label: "Edit",
      onClick: () => console.log("edit!"),
    },
    {
      label: "Delete",
      onClick: () => console.log("delete!"),
    },
  ];
  return (
    <CategoryWrapper>
      <DragHandle />
      <CategoryColor $color={color} />
      <CategoryName as="h2">{categoryName}</CategoryName>
      <Weight>
        {weight}
        {weightUnit}
      </Weight>
      <Quantity>x {quantity}</Quantity>
      <Dropdown useIconButton={true} items={actions} />
    </CategoryWrapper>
  );
};
