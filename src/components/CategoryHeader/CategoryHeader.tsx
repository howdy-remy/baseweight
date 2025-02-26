import type { DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

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
  name?: string | null;
  color: string | null;
  dragHandleProps: {
    attributes?: DraggableAttributes;
    listeners?: SyntheticListenerMap;
  };
  quantity: number;
  weight: number;
  weightUnit: string;
  onDelete: () => void;
  onEdit: () => void;
};

export const CategoryHeader = ({
  name,
  color = "#abcabc",
  dragHandleProps,
  quantity,
  weight,
  weightUnit,
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
      <div {...dragHandleProps.attributes} {...dragHandleProps.listeners}>
        <DragHandle />
      </div>
      <CategoryColor $color={color} />
      <CategoryName as="h2">{name}</CategoryName>
      <Weight>
        {weight} {weightUnit}
      </Weight>
      <Quantity>x {quantity}</Quantity>
      <Dropdown useIconButton={true} items={actions} />
    </CategoryWrapper>
  );
};
