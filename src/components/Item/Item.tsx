import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import type { CategoryItem } from "api/category_item";
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
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: categoryItem.id.toString() });

  const style = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // actions -------------------------------------------------------------------
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
    <div ref={setNodeRef} style={style}>
      <ItemWrapper>
        <div {...attributes} {...listeners}>
          <DragHandle />
        </div>
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
    </div>
  );
};
