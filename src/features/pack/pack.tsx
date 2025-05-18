import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

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

import {
  headingsPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  quotePlugin,
  thematicBreakPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  BlockTypeSelect,
  linkDialogPlugin,
  CreateLink,
  ListsToggle,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";
import rehypeFormat from "rehype-format";

import { encode } from "lib/sqids";

import { useGetPackQuery, useUpdatePackMutation } from "api/packs";
import {
  type Item as ItemType,
  useCreateItemMutation,
  useLazySearchItemsQuery,
} from "api/items";
import {
  useCreateCategoriesItemMutation,
  useDeleteCategoriesItemMutation,
  useUpdateQuantityMutation,
} from "api/category_item";
import {
  useDeleteCategoryMutation,
  useUpdateCategoriesMutation,
  useUpsertCategoryMutation,
  type Category as CategoryType,
} from "api/categories";

import { useAuth } from "contexts/Authentication";

import { convertGramsToUnit } from "utils/unit-conversion/unit-conversion";

import { Layout } from "components/Layout/Layout";
import { HeadingOne, TextSansRegular } from "components/Typography";
import { Button } from "components/Button";
import { IconButton } from "components/IconButton";
import { Input } from "components/Input";
import { Select } from "components/Select";
import { ActionsWrapper } from "components/Modal";
import { Space } from "components/Space";
import { PackHero } from "components/PackHero";
import { CategoryHeader } from "components/CategoryHeader";
import { Items } from "components/Items";

import {
  AddItemToPack,
  Category,
  CategoryModal,
  CreateItemModal,
  OnSubmitItemProps,
} from "./components";

import {
  DescriptionWrapper,
  HeaderWrapper,
  PackActions,
  PackHeader,
  PackWrapper,
} from "./pack.styled";
import "./mdxeditor.styles.css";
import { Unit } from "types/Unit";
import { useToast } from "contexts/Toast";

export const Pack = () => {
  const { session } = useAuth();
  let { packId } = useParams();

  // get initial pack data -----------------------------------------------------
  const { data: pack, isLoading, refetch } = useGetPackQuery({ packId });
  const [sortedCategories, setSortedCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    const sorted =
      pack?.categories?.slice().sort((a, b) => a.order - b.order) || [];
    setSortedCategories(sorted);
  }, [pack]);

  const packTotalWeight = sortedCategories.reduce((acc, { totalWeight }) => {
    return acc + totalWeight;
  }, 0);

  // PACK ======================================================================
  const { addToast } = useToast();
  const copyShareLink = () => {
    if (!pack?.id) {
      return;
    }
    const id = encode(pack.id);
    const url = `${window.location.origin}/p/${id}`;
    navigator.clipboard.writeText(url);
    addToast("Share link copied to clipboard!");
  };

  const [updatePack] = useUpdatePackMutation();

  const updateHeroUrl = async (url: string | null) => {
    if (!pack) return;
    await updatePack([
      {
        id: pack.id,
        hero_url: url,
      },
    ]);
    refetch();
  };

  const updateUnit = async (unit: Unit) => {
    if (!pack) return;
    await updatePack([
      {
        id: pack.id,
        unit,
      },
    ]);
    refetch();
  };

  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState<string | null>(
    pack?.name || null,
  );

  const saveName = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!pack) return;
    await updatePack([
      {
        id: pack.id,
        name: editedName,
      },
    ]);
    refetch();
    setIsEditingName(false);
  };
  const cancelNameChanges = () => {
    setEditedName(null);
    setIsEditingName(false);
  };

  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editedDescription, setEditedDescription] = useState<string | null>(
    null,
  );

  const switchToMarkdown = () => setIsEditingDescription(true);
  const saveMarkdown = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!pack) return;
    await updatePack([
      {
        id: pack.id,
        description: editedDescription,
      },
    ]);
    refetch();
    setIsEditingDescription(false);
  };
  const cancelMarkdownChanges = () => {
    setEditedDescription(null);
    setIsEditingDescription(false);
  };

  // ITEMS =====================================================================
  // search for items not included in category ---------------------------------
  const [searchItems, { data: resultItems, isLoading: isLoadingItems }] =
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
      type,
      description,
      weight_in_grams: weightInGrams,
      unit,
    });
    await createCategoriesItem({
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
      item_id: item.id,
      category_id: category.id,
      quantity: 1,
      order: category.categoryItems.length,
    });

    refetch();
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

  // CATEGORIES ================================================================
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
  if (!pack || isLoading) {
    return "loading...";
  }

  return (
    <Layout>
      <main>
        <PackHeader>
          <TextSansRegular>
            {pack.name} | {convertGramsToUnit(pack.unit, packTotalWeight)}{" "}
            {pack.unit.toLowerCase()}
          </TextSansRegular>
          <PackActions>
            <IconButton
              icon="share"
              variant="primary"
              onClick={copyShareLink}
            />
          </PackActions>
        </PackHeader>
        <PackHero url={pack.heroUrl} onUpload={updateHeroUrl} />
        <PackWrapper $columns={1}>
          <HeaderWrapper>
            {isEditingName ? (
              <form onSubmit={(event) => saveName(event)}>
                <Input
                  type="text"
                  value={editedName ?? ""}
                  onChange={(event) => setEditedName(event.target.value)}
                />
                <ActionsWrapper>
                  <Button
                    variant="secondary"
                    size="medium"
                    onClick={cancelNameChanges}
                  >
                    Cancel
                  </Button>
                  <Button variant="primary" size="medium" type="submit">
                    Save
                  </Button>
                </ActionsWrapper>
              </form>
            ) : (
              <HeadingOne as="h1" onClick={() => setIsEditingName(true)}>
                {pack?.name}
              </HeadingOne>
            )}
            <Select
              variant="primary"
              buttonSize="large"
              onChange={(e) => updateUnit(e.target.value as Unit)}
              value={pack.unit}
            >
              <option value={Unit.OZ}>oz</option>
              <option value={Unit.LB}>lb</option>
              <option value={Unit.G}>g</option>
              <option value={Unit.KG}>kg</option>
            </Select>
          </HeaderWrapper>
          {isEditingDescription ? (
            <form onSubmit={(event) => saveMarkdown(event)}>
              <MDXEditor
                className="editor"
                contentEditableClassName="content"
                markdown={pack?.description ?? ""}
                onChange={(value) => setEditedDescription(value)}
                spellCheck
                plugins={[
                  headingsPlugin(),
                  listsPlugin(),
                  linkPlugin(),
                  linkDialogPlugin(),
                  markdownShortcutPlugin(),
                  quotePlugin(),
                  thematicBreakPlugin(),
                  toolbarPlugin({
                    toolbarContents: () => (
                      <>
                        <UndoRedo />
                        <BoldItalicUnderlineToggles
                          options={["Bold", "Italic"]}
                        />
                        <BlockTypeSelect />
                        <CreateLink />
                        <ListsToggle />
                      </>
                    ),
                  }),
                ]}
              />
              <ActionsWrapper>
                <Button
                  variant="secondary"
                  size="medium"
                  onClick={cancelMarkdownChanges}
                >
                  Cancel
                </Button>
                <Button variant="primary" size="medium" type="submit">
                  Save
                </Button>
              </ActionsWrapper>
            </form>
          ) : (
            <DescriptionWrapper onClick={switchToMarkdown} className="display">
              <Markdown
                remarkPlugins={[remarkMdx, remarkGfm]}
                rehypePlugins={[rehypeFormat]}
              >
                {pack?.description}
              </Markdown>
              {!pack?.description && (
                <TextSansRegular>Click to enter a description</TextSansRegular>
              )}
            </DescriptionWrapper>
          )}
        </PackWrapper>

        <PackWrapper $columns={2}>
          <div>
            <Space size="xxl" />
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={sortedCategories.map((item) => item.id.toString())}
                strategy={verticalListSortingStrategy}
              >
                {sortedCategories.map((category) => (
                  <Category
                    key={category.id.toString()}
                    id={category.id.toString()}
                  >
                    {(attributes, listeners) => (
                      <>
                        <CategoryHeader
                          key={category.id}
                          category={category}
                          packUnit={pack!.unit}
                          onDelete={onDeleteCategory(category)}
                          onEdit={onInitiateEditCategory(category)}
                          dragHandleProps={{ attributes, listeners }}
                        />
                        <Items
                          items={category.categoryItems}
                          categoryId={category.id}
                          profileId={session!.user.id}
                          removeItem={removeItem}
                          updateQuantity={updateItemQuantity}
                        />
                        <AddItemToPack
                          onSearch={onSearchItems(category)}
                          onSelect={onSelectItem(category)}
                          onInitiateCreate={onInitiateCreateItem(category)}
                          results={resultItems ?? []}
                        />
                      </>
                    )}
                  </Category>
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
      </main>
    </Layout>
  );
};
