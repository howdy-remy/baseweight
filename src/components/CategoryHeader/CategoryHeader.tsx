import { DraggableAttributes } from "@dnd-kit/core";
import { DragHandle } from "../DragHandle";
import { Dropdown } from "../Dropdown";
import {
  CategoryColor,
  CategoryName,
  CategoryWrapper,
  Quantity,
  Weight,
} from "./CategoryHeader.styled";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

type CategoryHeaderProps = {
  categoryName?: string | null;
  color: string | null;
  dragHandleProps: {
    attributes: DraggableAttributes;
    listeners?: SyntheticListenerMap;
  };
  quantity: number;
  weight: number;
  weightUnit: string;
  onDelete: () => void;
};

export const CategoryHeader = ({
  categoryName,
  color = "#abcabc",
  dragHandleProps,
  quantity,
  weight,
  weightUnit,
  onDelete,
}: CategoryHeaderProps) => {
  const actions = [
    {
      label: "Edit",
      onClick: () => console.log("edit!"),
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
