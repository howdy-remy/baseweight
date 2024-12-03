import { type Item as ItemType } from "../../api/items";
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
  item: ItemType;
};

export const Item = ({ item }: ItemProps) => {
  const actions = [
    {
      label: "Edit",
      onClick: () => console.log("edit!"),
    },
    {
      label: "Remove",
      onClick: () => console.log("remove!"),
    },
  ];
  return (
    <ItemWrapper>
      <DragHandle />
      <Type>{item.type}</Type>
      <Description>{item.description}</Description>
      <Weight>{item.weightInGrams}g</Weight>
      <Quantity>x {item.quantity}</Quantity>
      <Dropdown useIconButton={true} items={actions} />
    </ItemWrapper>
  );
};
