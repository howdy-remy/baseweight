import { CategoryItem } from "../../api/category_item";
import { DragHandle } from "../DragHandle";
import { Dropdown } from "../Dropdown";
import {
  Description,
  ItemWrapper,
  Quantity,
  Type,
  Weight,
} from "./Item.styled";

type ItemProps = {
  categoryItem: CategoryItem;
  onRemove: (id: number) => void;
};

export const Item = ({ categoryItem, onRemove }: ItemProps) => {
  const actions = [
    {
      label: "Edit",
      onClick: () => console.log("edit!"),
    },
    {
      label: "Remove",
      onClick: () => {
        onRemove(categoryItem.id);
      },
    },
  ];

  return (
    <ItemWrapper>
      <DragHandle />
      <Type>{categoryItem.item.type}</Type>
      <Description>{categoryItem.item.description}</Description>
      <Weight>{categoryItem.item.weightInGrams}g</Weight>
      <Quantity>x {categoryItem.quantity}</Quantity>
      <Dropdown useIconButton={true} items={actions} />
    </ItemWrapper>
  );
};
