import type { CategoryItem } from "api/category_item";

import { DragHandle } from "../DragHandle";
import { Description, ItemWrapper, Type } from "./Item.styled";

type ItemProps = {
  categoryItem: CategoryItem;
};

export const DragOverlayItem = ({ categoryItem }: ItemProps) => {
  return (
    <div>
      <ItemWrapper $isDragging>
        <DragHandle />
        <Type>{categoryItem.item.type}</Type>
        <Description>{categoryItem.item.description}</Description>
      </ItemWrapper>
    </div>
  );
};
