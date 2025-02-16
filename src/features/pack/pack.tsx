import { useParams } from "react-router";
import { useGetPackQuery } from "../../api/packs";
import { Layout } from "../../components/Layout/Layout";
import { ChangeEvent, Fragment, useState } from "react";
import {
  type Item as ItemType,
  useCreateItemMutation,
  useLazySearchItemsQuery,
} from "../../api/items";
import { useAuth } from "../../contexts/Authentication";
import {
  CategoryItem,
  useCreateCategoriesItemMutation,
  useDeleteCategoriesItemMutation,
  useUpdateQuantityMutation,
} from "../../api/category_item";
import {
  type Category as CategoryType,
  useCreateCategoryMutation,
} from "../../api/categories";
import {
  CreateItemForm,
  OnSubmitItemProps,
} from "../../components/ItemForm/ItemForm";
import {
  HeadingOne,
  TextSansRegular,
} from "../../components/Typography/typography";
import { Category } from "../../components/Category";
import { Item } from "../../components/Item";
import { Items } from "../../components/Item/Item.styled";
import { PackWrapper } from "./pack.styled";
import { AddItemToPack } from "../../components/AddItemToPack";
import { Modal } from "../../components/Modal";
import { Button } from "../../components/Button";
import { CreateCategoryModal } from "./components/CreateCategoryModal";

export const Pack = () => {
  const { session } = useAuth();
  let { packId } = useParams();

  // queries and mutations
  const { data: pack, isLoading, refetch } = useGetPackQuery({ packId });
  const [createItem] = useCreateItemMutation();
  const [createCategoriesItem] = useCreateCategoriesItemMutation();
  const [deleteCategoriesItem] = useDeleteCategoriesItemMutation();
  const [updateQuantity] = useUpdateQuantityMutation();
  const [searchItems, { data: items, isLoading: isLoadingItems }] =
    useLazySearchItemsQuery();

  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
    null,
  );
  const createNewItemAndAddToPack =
    (category: CategoryType) =>
    async ({
      type,
      description,
      weightInGrams,
      quantity,
    }: OnSubmitItemProps) => {
      const { data } = await createItem({
        profile_id: session!.user.id,
        type,
        description,
        weight_in_grams: weightInGrams,
      });
      await createCategoriesItem({
        profile_id: session!.user.id,
        item_id: data?.[0].id,
        category_id: category.id,
        quantity,
      });

      setIsCreateItemModalOpen(false);
      setSelectedCategory(null);
      refetch();
    };

  const removeItem = async (id: number) => {
    await deleteCategoriesItem(id);
    refetch();
  };

  const updateItemQuantity = async (
    categoryItemId: number,
    quantity: number,
  ) => {
    await updateQuantity({ categoryItemId, quantity });
    refetch();
  };

  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] =
    useState(false);

  const onSearchItems =
    (category: CategoryType) =>
    async (event: ChangeEvent<HTMLInputElement>) => {
      await searchItems({
        searchString: event.target.value,
        excludeIds: category.categoryItems?.map(({ item }) => item.id),
      });
    };

  const onSelectItem = (category: CategoryType) => async (item: ItemType) => {
    await createCategoriesItem({
      profile_id: session!.user.id,
      item_id: item.id,
      category_id: category.id,
      quantity: 1,
    });

    refetch();
  };

  const [isCreateItemModalOpen, setIsCreateItemModalOpen] = useState(false);
  const [query, setTypeQuery] = useState("");
  const onCreateItem = (category: CategoryType) => {
    return async (type: string) => {
      setSelectedCategory(category);
      setTypeQuery(type);
      setIsCreateItemModalOpen(true);
    };
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
          {pack?.categories.map((category, i) => (
            <Fragment key={category.id || `category_${i}`}>
              <Category
                key={category.id || `category_${i}`}
                categoryName={category.name}
                color={category.color}
                quantity={category.totalQuantity}
                weight={category.totalWeight}
                weightUnit="g"
              />
              <Items>
                {category.categoryItems.map((categoryItem) => (
                  <Item
                    key={categoryItem.id}
                    categoryItem={categoryItem as CategoryItem}
                    removeFromPack={removeItem}
                    updateItemQuantity={updateItemQuantity}
                  />
                ))}
                <AddItemToPack
                  onSearch={onSearchItems(category)}
                  onSelect={onSelectItem(category)}
                  onCreate={onCreateItem(category)}
                  results={items ?? []}
                />
              </Items>
            </Fragment>
          ))}
          <CreateCategoryModal packId={packId} refetch={refetch} />
        </div>
      </PackWrapper>
      {selectedCategory && (
        <Modal
          isOpen={isCreateItemModalOpen}
          onClose={() => setIsCreateItemModalOpen(false)}
        >
          <CreateItemForm
            initialType={query}
            onSubmit={createNewItemAndAddToPack(selectedCategory)}
          />
        </Modal>
      )}
    </Layout>
  );
};
