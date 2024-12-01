import { Link, useParams } from "react-router";
import { useGetPackQuery } from "../../api/packs";
import { Layout } from "../../components/Layout/Layout";
import { useState } from "react";
import { Item, useCreateItemMutation } from "../../api/items";
import { useAuth } from "../../contexts/Authentication";
import { useCreateCategoriesItemMutation } from "../../api/category_item";
import { Category, useCreateCategoryMutation } from "../../api/categories";
import {
  CreateItemForm,
  OnSubmitItemProps,
} from "../../components/ItemForm/ItemForm";

export const Pack = () => {
  const { session } = useAuth();
  let { packId } = useParams();

  const [categoryName, setCategoryName] = useState("");
  const [categoryColor, setCategoryColor] = useState("#000000");

  const { data: pack, isLoading, refetch } = useGetPackQuery({ packId });
  const [createItem] = useCreateItemMutation();
  const [createCategory] = useCreateCategoryMutation();
  const [createCategoriesItem] = useCreateCategoriesItemMutation();

  const addItem =
    (category: Category) =>
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
      <div>
        <Link to="/">home</Link>
        <Link to="/account">account</Link>
        <p>{pack?.name}</p>
        {pack?.categories.map((category) => (
          <>
            <p key={category.id}>{category.name}</p>
            {category.items.map((item) => (
              <p key={item.id}>
                {item.type} : {item.description}
              </p>
            ))}

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
    </Layout>
  );
};
