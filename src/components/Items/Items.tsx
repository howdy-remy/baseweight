import { useEffect, useState } from "react";

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import {
  CategoryItem,
  useUpdateCategoryItemsMutation,
} from "api/category_item";

import { Item } from "components/Item";
import { DragOverlayItem } from "components/Item/DragOverlayItem";
import { ItemsWrapper } from "./Items.styled";

type ItemsProps = {
  categoryId: number;
  items: CategoryItem[];
  profileId: string;
  removeItem: (id: number) => void;
  updateQuantity: (categoryItemId: number, quantity: number) => void;
};

export const Items = ({
  categoryId,
  items,
  profileId,
  removeItem,
  updateQuantity,
}: ItemsProps) => {
  const [sortedItems, setSortedItems] = useState<CategoryItem[]>([]);

  useEffect(() => {
    const sorted = items.slice().sort((a, b) => a.order - b.order) || [];
    setSortedItems(sorted);
  }, [items]);

  // drag and drop -------------------------------------------------------------
  const [updateItems] = useUpdateCategoryItemsMutation();
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  // handlers
  function handleDragStart(event: DragStartEvent) {
    const { active } = event;

    setActiveId(active.id);
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = sortedItems.findIndex(
        (item) => item.id.toString() === active.id,
      );
      const newIndex = sortedItems.findIndex(
        (item) => item.id.toString() === over?.id,
      );
      const updatedSort = arrayMove(sortedItems, oldIndex, newIndex);

      setSortedItems(updatedSort);
      const updates = updatedSort.map((item, index) => ({
        id: item.id,
        profile_id: profileId,
        category_id: categoryId,
        item_id: item.item.id,
        order: index,
      }));

      updateItems(updates);
    }
    setActiveId(null);
  };

  return (
    <ItemsWrapper>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={sortedItems.map((item) => item.id.toString())}
          strategy={verticalListSortingStrategy}
        >
          {sortedItems.map((categoryItem) => (
            <Item
              key={categoryItem.id}
              categoryItem={categoryItem as CategoryItem}
              removeFromPack={removeItem}
              updateItemQuantity={updateQuantity}
            />
          ))}
        </SortableContext>
        <DragOverlay>
          {activeId ? (
            <DragOverlayItem
              key={activeId}
              categoryItem={
                sortedItems.find(
                  (item) => item.id.toString() === activeId,
                ) as CategoryItem
              }
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </ItemsWrapper>
  );
};
