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
import { ItemsWrapper } from "./Items.styled";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  CategoryItem,
  useDeleteCategoriesItemMutation,
  useUpdateCategoryItemsMutation,
  useUpdateQuantityMutation,
} from "api/category_item";
import { useEffect, useState } from "react";
import { Item } from "components/Item";
import { DragOverlayItem } from "components/Item/DragOverlayItem";

type ItemsProps = {
  categoryId: number;
  items: CategoryItem[];
  profileId: string;
  refetch: () => void;
};

export const Items = ({
  categoryId,
  items,
  profileId,
  refetch,
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

  // remove item from pack -----------------------------------------------------
  const [deleteCategoriesItem] = useDeleteCategoriesItemMutation();

  const removeItem = async (id: number) => {
    await deleteCategoriesItem(id);
    refetch();
  };

  // update item quantity ------------------------------------------------------
  const [updateQuantity] = useUpdateQuantityMutation();

  const updateItemQuantity = async (
    categoryItemId: number,
    quantity: number,
  ) => {
    await updateQuantity({ categoryItemId, quantity });
    refetch();
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
              updateItemQuantity={updateItemQuantity}
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
