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
import { convertGramsToUnit } from "utils/unit-conversion/unit-conversion";
import { TextMonoBoldItalic } from "components/Typography";

type CategoryHeaderProps = {
  category: Category;
  packUnit: Unit;
  dragHandleProps: {
    attributes: DraggableAttributes;
    listeners?: SyntheticListenerMap;
  };
  onDelete: () => void;
  onEdit: () => void;
};

export const CategoryHeader = ({
  category,
  packUnit,
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

  const totalWeight = convertGramsToUnit(packUnit, category.totalWeight);

  return (
    <CategoryWrapper>
      <div {...dragHandleProps?.attributes} {...dragHandleProps?.listeners}>
        <DragHandle />
      </div>
      <CategoryColor $color={category.color} />
      <CategoryName as="h2">{category.name}</CategoryName>
      <Weight>{totalWeight}</Weight>
      <TextMonoBoldItalic>{packUnit.toLowerCase()}</TextMonoBoldItalic>
      <Quantity>x {category.totalQuantity}</Quantity>
      <Dropdown useIconButton={true} items={actions} />
    </CategoryWrapper>
  );
};
