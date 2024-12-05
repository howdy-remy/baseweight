import { useParams } from "react-router";
import { useGetPackQuery } from "../../api/packs";
import { Layout } from "../../components/Layout/Layout";
import { ChangeEvent, useState } from "react";
import {
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

export const Pack = () => {
  const { session } = useAuth();
  let { packId } = useParams();

  const [categoryName, setCategoryName] = useState("");
  const [categoryColor, setCategoryColor] = useState("#000000");

  const { data: pack, isLoading, refetch } = useGetPackQuery({ packId });
  const [createItem] = useCreateItemMutation();
  const [createCategory] = useCreateCategoryMutation();
  const [createCategoriesItem] = useCreateCategoriesItemMutation();
  const [deleteCategoriesItem] = useDeleteCategoriesItemMutation();
  const [updateQuantity] = useUpdateQuantityMutation();

  const [searchItems, { data: items, isLoading: isLoadingItems }] =
    useLazySearchItemsQuery();

  const addItem =
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

      refetch();
    };

  const removeItem = async (id: number) => {
    await deleteCategoriesItem(id);
    refetch();
  };

  const updateItemQuantity = async (
    categoryItemId: number,
    quantity: number
  ) => {
    await updateQuantity({ categoryItemId, quantity });
    refetch();
  };

  const addCategory = async () => {
    if (!pack) return;
    await createCategory({
      name: categoryName,
      color: categoryColor,
      pack_id: pack.id,
    });
    refetch();
  };

  const onSearchItems =
    (category: CategoryType) =>
    async (event: ChangeEvent<HTMLInputElement>) => {
      await searchItems({
        searchString: event.target.value,
        excludeIds: category.categoryItems?.map(({ item }) => item.id),
      });
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
          {pack?.categories.map((category) => (
            <>
              <Category
                key={category.id}
                categoryName={category.name}
                color="#abcabc"
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
                <AddItemToPack onSearch={onSearchItems(category)} />
                {items?.map((item) => (
                  <p>
                    {item.type} – {item.description}
                  </p>
                ))}
              </Items>

              <CreateItemForm onSubmit={addItem(category)} />
            </>
          ))}
          <p>category</p>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              addCategory();
            }}
            className="form-widget"
          >
            <fieldset>
              <label htmlFor="type">name</label>
              <input
                id="name"
                type="text"
                value={categoryName}
                placeholder="name"
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </fieldset>
            <fieldset>
              <label htmlFor="color">color</label>
              <input
                id="color"
                type="color"
                value={categoryColor}
                placeholder="color"
                onChange={(e) => setCategoryColor(e.target.value)}
              />
            </fieldset>

            <button className="button block primary" type="submit">
              Add category
            </button>
          </form>
        </div>
      </PackWrapper>
    </Layout>
  );
};
