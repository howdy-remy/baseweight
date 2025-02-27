import type { DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

import { Unit } from "types/Unit";

import { Category } from "api/categories";

import { DragHandle } from "../DragHandle";
import { Dropdown } from "../Dropdown";
import {
  CategoryColor,
  CategoryName,
  CategoryWrapper,
  Quantity,
  Weight,
} from "./CategoryHeader.styled";

type CategoryHeaderProps = {
  category: Category;
  dragHandleProps: {
    attributes: DraggableAttributes;
    listeners?: SyntheticListenerMap;
  };
  onDelete: () => void;
  onEdit: () => void;
};

export const CategoryHeader = ({
  category,
  dragHandleProps,
  onDelete,
  onEdit,
}: CategoryHeaderProps) => {
  const actions = [
    {
      label: "Edit",
      onClick: onEdit,
    },
    {
      label: "Delete",
      onClick: onDelete,
    },
  ];
  return (
    <CategoryWrapper>
      <div {...dragHandleProps?.attributes} {...dragHandleProps?.listeners}>
        <DragHandle />
      </div>
      <CategoryColor $color={category.color} />
      <CategoryName as="h2">{category.name}</CategoryName>
      <Weight>
        {category.totalWeight} {Unit.G}
      </Weight>
      <Quantity>x {category.totalWeight}</Quantity>
      <Dropdown useIconButton={true} items={actions} />
    </CategoryWrapper>
  );
};
