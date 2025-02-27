import { ReactNode } from "react";

import { DraggableAttributes } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { CategoryWrapper } from "./Category.styled";

export const Category = ({
  id,
  children,
}: {
  id: string;
  children: (
    attributes: DraggableAttributes,
    listeners?: SyntheticListenerMap,
  ) => ReactNode;
}) => {
  const {
    attributes,
    isDragging,
    listeners,
    transform,
    transition,
    setNodeRef,
  } = useSortable({ id });

  const style = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <CategoryWrapper ref={setNodeRef} style={style}>
      {children(attributes, listeners)}
    </CategoryWrapper>
  );
};
