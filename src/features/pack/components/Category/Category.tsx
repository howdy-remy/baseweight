import { ChangeEvent } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import type { Category as CategoryType } from "api/categories";
import { Item } from "api/items";

import { CategoryHeader } from "components/CategoryHeader";
import { Items } from "components/Items";
import { AddItemToPack } from "../AddItemToPack";
import { CategoryWrapper } from "./Category.styled";
import { Unit } from "types/Unit";

type CategoryProps = {
  category: CategoryType;
  items: Item[];
  profileId: string;
  refetch: () => void;
  onDeleteCategory: (category: CategoryType) => () => void;
  onEditCategory: (category: CategoryType) => () => void;
  onInitiateCreateItem: (category: CategoryType) => (type: string) => void;
  onSearchItems: (
    category: CategoryType,
  ) => (event: ChangeEvent<HTMLInputElement>) => void;
  onSelectItem: (category: CategoryType) => (item: Item) => void;
};

export const Category = ({
  category,
  items,
  profileId,
  onDeleteCategory,
  onEditCategory,
  onInitiateCreateItem,
  onSearchItems,
  onSelectItem,
  refetch,
}: CategoryProps) => {
  const {
    attributes,
    isDragging,
    listeners,
    transform,
    transition,
    setNodeRef,
  } = useSortable({ id: category.id.toString() });

  const style = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <CategoryWrapper ref={setNodeRef} style={style}>
      <CategoryHeader
        key={category.id}
        name={category.name}
        color={category.color}
        quantity={category.totalQuantity}
        weight={category.totalWeight}
        weightUnit={Unit.G.toLowerCase()}
        onDelete={onDeleteCategory(category)}
        onEdit={onEditCategory(category)}
        dragHandleProps={{ attributes, listeners }}
      />
      <Items
        items={category.categoryItems}
        refetch={refetch}
        categoryId={category.id}
        profileId={profileId}
      />
      <AddItemToPack
        onSearch={onSearchItems(category)}
        onSelect={onSelectItem(category)}
        onInitiateCreate={onInitiateCreateItem(category)}
        results={items ?? []}
      />
    </CategoryWrapper>
  );
};
