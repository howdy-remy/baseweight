import { ChangeEvent, Fragment, useEffect, useState } from "react";
import { useParams } from "react-router";

import { useGetPackQuery } from "api/packs";
import {
  type Item as ItemType,
  useCreateItemMutation,
  useLazySearchItemsQuery,
} from "api/items";
import { useCreateCategoriesItemMutation } from "api/category_item";
import {
  useDeleteCategoryMutation,
  useUpdateCategoriesMutation,
  type Category as CategoryType,
} from "api/categories";

import { useAuth } from "contexts/Authentication";

import { Items } from "components/Items";
import { Layout } from "components/Layout/Layout";
import { HeadingOne, TextSansRegular } from "components/Typography";

import { PackWrapper } from "./pack.styled";
import {
  AddItemToPack,
  CreateCategoryModal,
  CreateItemModal,
  OnSubmitItemProps,
} from "./components";
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
import { Category } from "./components/Category";

export const Pack = () => {
  const { session } = useAuth();
  let { packId } = useParams();

  // get initial pack data -----------------------------------------------------
  const { data: pack, isLoading, refetch } = useGetPackQuery({ packId });
  const [sortedCategories, setSortedCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    const sorted =
      pack?.categories.slice().sort((a, b) => a.order - b.order) || [];
    setSortedCategories(sorted);
  }, [pack]);

  // search for items not included in category ---------------------------------
  const [searchItems, { data: items, isLoading: isLoadingItems }] =
    useLazySearchItemsQuery();

  const onSearchItems =
    (category: CategoryType) =>
    async (event: ChangeEvent<HTMLInputElement>) => {
      await searchItems({
        searchString: event.target.value,
        excludeIds: category.categoryItems?.map(({ item }) => item.id),
      });
    };

  // create new item and add to pack -------------------------------------------
  const [createItem] = useCreateItemMutation();

  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
    null,
  );
  const [isCreateItemModalOpen, setIsCreateItemModalOpen] = useState(false);
  const [query, setTypeQuery] = useState("");

  const onInitiateCreateItem = (category: CategoryType) => {
    return async (type: string) => {
      setSelectedCategory(category);
      setIsCreateItemModalOpen(true);
      setTypeQuery(type);
    };
  };

  const createNewItemAndAddToPack = async ({
    type,
    description,
    weightInGrams,
    quantity,
  }: OnSubmitItemProps) => {
    if (!selectedCategory) return;
    const { data } = await createItem({
      profile_id: session!.user.id,
      type,
      description,
      weight_in_grams: weightInGrams,
    });
    await createCategoriesItem({
      profile_id: session!.user.id,
      item_id: data?.[0].id,
      category_id: selectedCategory?.id,
      quantity,
    });

    setIsCreateItemModalOpen(false);
    setSelectedCategory(null);
    refetch();
  };

  // add existing item to pack -------------------------------------------------
  const [createCategoriesItem] = useCreateCategoriesItemMutation();

  const onSelectItem = (category: CategoryType) => async (item: ItemType) => {
    await createCategoriesItem({
      profile_id: session!.user.id,
      item_id: item.id,
      category_id: category.id,
      quantity: 1,
      order: category.categoryItems.length,
    });

    refetch();
  };

  // delete category -----------------------------------------------------------
  const [deleteCategory] = useDeleteCategoryMutation();

  const onDeleteCategory = (category: CategoryType) => async () => {
    await deleteCategory(category);
    refetch();
  };

  // drag and drop -------------------------------------------------------------
  const [updateCategories] = useUpdateCategoriesMutation();
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
      const oldIndex = sortedCategories.findIndex(
        (item) => item.id.toString() === active.id,
      );
      const newIndex = sortedCategories.findIndex(
        (item) => item.id.toString() === over?.id,
      );
      const updatedSort = arrayMove(sortedCategories, oldIndex, newIndex);

      setSortedCategories(updatedSort);
      const updates = updatedSort.map((category, index) => ({
        id: category.id,
        order: index,
      }));

      updateCategories(updates);
    }
    setActiveId(null);
  };

  if (isLoading) {
    return "loading...";
  }

  return (
    <Layout>
      <PackWrapper>
        <div>
          <HeadingOne as="h1">{pack?.name}</HeadingOne>
          <TextSansRegular>Lorem ipsum</TextSansRegular>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={sortedCategories.map((item) => item.id.toString())}
              strategy={verticalListSortingStrategy}
            >
              {sortedCategories.map((category, i) => (
                <Category
                  key={category.id}
                  category={category}
                  items={items ?? []}
                  profileId={session!.user.id}
                  refetch={refetch}
                  onDeleteCategory={onDeleteCategory}
                  onInitiateCreateItem={onInitiateCreateItem}
                  onSearchItems={onSearchItems}
                  onSelectItem={onSelectItem}
                />
              ))}
              <DragOverlay adjustScale={false} />
            </SortableContext>
          </DndContext>

          {/* modals ------------------------------------------------------- */}
          {selectedCategory && (
            <CreateItemModal
              isOpen={isCreateItemModalOpen}
              initialType={query}
              onClose={() => setIsCreateItemModalOpen(false)}
              onSubmit={createNewItemAndAddToPack}
            />
          )}
          <CreateCategoryModal
            packId={packId}
            refetch={refetch}
            nextOrder={sortedCategories.length}
          />
        </div>
      </PackWrapper>
    </Layout>
  );
};
