import { Link, useParams } from "react-router";
import { useGetPackQuery } from "../../api/packs";
import { Layout } from "../../components/Layout/Layout";
import { useState } from "react";
import { type Item as ItemType, useCreateItemMutation } from "../../api/items";
import { useAuth } from "../../contexts/Authentication";
import {
  useCreateCategoriesItemMutation,
  useDeleteCategoriesItemMutation,
} from "../../api/categories_item";
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
import { Button } from "../../components/Button";

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
        quantity,
      });
      await createCategoriesItem({
        profile_id: session!.user.id,
        item_id: data?.[0].id,
        category_id: category.id,
      });

      refetch();
    };

  const removeItem = async (id: number) => {
    await deleteCategoriesItem(id);
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
                {category.items.map((item) => (
                  <Item
                    key={item.id}
                    item={item as ItemType}
                    onRemove={removeItem}
                  />
                ))}
                <Button variant="secondary" size="large" expandWidth>
                  Add item
                </Button>
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
