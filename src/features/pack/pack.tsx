import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router";

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

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
  useUpsertCategoryMutation,
  type Category as CategoryType,
} from "api/categories";

import { useAuth } from "contexts/Authentication";

import { Layout } from "components/Layout/Layout";
import { HeadingOne, TextSansRegular } from "components/Typography";

import {
  Category,
  CategoryModal,
  CreateItemModal,
  OnSubmitItemProps,
} from "./components";

import { PackWrapper } from "./pack.styled";
import { Button } from "components/Button";

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

  const [categoryToAddTo, setCategoryToAddTo] = useState<CategoryType | null>(
    null,
  );
  const [isCreateItemModalOpen, setIsCreateItemModalOpen] = useState(false);
  const [query, setTypeQuery] = useState("");

  const onInitiateCreateItem = (category: CategoryType) => {
    return async (type: string) => {
      setCategoryToAddTo(category);
      setIsCreateItemModalOpen(true);
      setTypeQuery(type);
    };
  };

  const createNewItemAndAddToPack = async ({
    type,
    description,
    weightInGrams,
    unit,
    quantity,
  }: OnSubmitItemProps) => {
    if (!categoryToAddTo) return;
    const { data } = await createItem({
      profile_id: session!.user.id,
      type,
      description,
      weight_in_grams: weightInGrams,
      unit,
    });
    await createCategoriesItem({
      profile_id: session!.user.id,
      item_id: data?.[0].id,
      category_id: categoryToAddTo?.id,
      quantity,
      order: categoryToAddTo.categoryItems.length,
    });

    setIsCreateItemModalOpen(false);
    setCategoryToAddTo(null);
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

  // create/edit category ------------------------------------------------------
  const [upsertCategory] = useUpsertCategoryMutation();

  const [categoryToEdit, setCategoryToEdit] = useState<CategoryType | null>(
    null,
  );
  // modal state
  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] =
    useState<boolean>(false);

  const onInitiateEditCategory = (category: CategoryType) => () => {
    setIsCreateCategoryModalOpen(true);
    setCategoryToEdit(category);
  };

  const onUpsertCategory = async ({
    name,
    color,
    order,
    id,
  }: Partial<CategoryType>) => {
    await upsertCategory({
      id,
      name,
      color,
      order: order || sortedCategories.length,
      pack_id: packId,
    });
    refetch();
    setCategoryToEdit(null);
  };

  const onCloseCategoryModal = () => {
    setIsCreateCategoryModalOpen(false);
    setCategoryToEdit(null);
  };

  // delete category -----------------------------------------------------------
  const [deleteCategory] = useDeleteCategoryMutation();

  const onDeleteCategory = (category: CategoryType) => async () => {
    await deleteCategory(category);
    refetch();
  };

  // drag and drop -------------------------------------------------------------
  const [updateCategories] = useUpdateCategoriesMutation();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  // handlers
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
  };

  // render --------------------------------------------------------------------
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
                  onEditCategory={onInitiateEditCategory}
                  onDeleteCategory={onDeleteCategory}
                  onInitiateCreateItem={onInitiateCreateItem}
                  onSearchItems={onSearchItems}
                  onSelectItem={onSelectItem}
                />
              ))}
              <DragOverlay adjustScale={false} />
            </SortableContext>
          </DndContext>

          {/* add category button ------------------------------------------ */}
          <Button
            variant="secondary"
            size="large"
            expandWidth
            onClick={() => setIsCreateCategoryModalOpen(true)}
          >
            Add category
          </Button>

          {/* modals ------------------------------------------------------- */}
          <CreateItemModal
            categoryName={categoryToAddTo?.name || "category"}
            isOpen={isCreateItemModalOpen}
            initialType={query}
            onClose={() => setIsCreateItemModalOpen(false)}
            onSubmit={createNewItemAndAddToPack}
          />

          <CategoryModal
            initialProps={
              categoryToEdit
                ? {
                    id: categoryToEdit?.id,
                    name: categoryToEdit?.name,
                    color: categoryToEdit?.color,
                  }
                : null
            }
            isOpen={isCreateCategoryModalOpen}
            onClose={onCloseCategoryModal}
            onSubmit={onUpsertCategory}
          />
        </div>
      </PackWrapper>
    </Layout>
  );
};
