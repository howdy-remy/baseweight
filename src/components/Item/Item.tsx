import { CategoryItem } from "../../api/category_item";
import { Button } from "../Button";
import { DragHandle } from "../DragHandle";
import { Dropdown } from "../Dropdown";
import { IconButton } from "../IconButton";
import {
  Description,
  ItemWrapper,
  Quantity,
  QuantityText,
  Type,
  Weight,
} from "./Item.styled";

type ItemProps = {
  categoryItem: CategoryItem;
  removeFromPack: (id: number) => void;
  updateItemQuantity: (id: number, quantity: number) => void;
};

export const Item = ({
  categoryItem,
  removeFromPack,
  updateItemQuantity,
}: ItemProps) => {
  const actions = [
    {
      label: "Remove",
      onClick: () => {
        removeFromPack(categoryItem.id);
      },
    },
  ];

  const increaseQuantity = () => {
    updateItemQuantity(categoryItem.id, categoryItem.quantity + 1);
  };

  const reduceQuantity = () => {
    const newQuantity = categoryItem.quantity - 1;
    if (newQuantity < 0) return;
    updateItemQuantity(categoryItem.id, categoryItem.quantity - 1);
  };

  return (
    <ItemWrapper>
      <DragHandle />
      <Type>{categoryItem.item.type}</Type>
      <Description>{categoryItem.item.description}</Description>
      <Weight>{categoryItem.item.weightInGrams}g</Weight>
      <Quantity>
        <IconButton variant="secondary" icon="-" onClick={reduceQuantity} />
        <QuantityText>{categoryItem.quantity}</QuantityText>
        <IconButton variant="secondary" icon="+" onClick={increaseQuantity} />
      </Quantity>
      <Dropdown useIconButton={true} items={actions} />
    </ItemWrapper>
  );
};
