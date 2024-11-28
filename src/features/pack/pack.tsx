import { Link, useParams } from "react-router";
import { useGetPackQuery } from "../../api/packs";
import { Layout } from "../../components/Layout/Layout";
import { useState } from "react";
import { useCreateItemMutation } from "../../api/items";
import { useAuth } from "../../contexts/Authentication";
import { useCreateCategoriesItemMutation } from "../../api/category_item";
import { useCreateCategoryMutation } from "../../api/categories";

export const Pack = () => {
  const { session } = useAuth();
  let { packId } = useParams();

  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [weight, setWeight] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const [categoryName, setCategoryName] = useState("");
  const [categoryColor, setCategoryColor] = useState("#000000");

  const { data: pack, isLoading, refetch } = useGetPackQuery({ packId });
  const [createItem] = useCreateItemMutation();
  const [createCategory] = useCreateCategoryMutation();
  const [createCategoriesItem] = useCreateCategoriesItemMutation();
  const addItem = async (category) => {
    const { data } = await createItem({
      profile_id: session!.user.id,
      type,
      description,
      weight_in_grams: weight,
      quantity,
    });
    await createCategoriesItem({
      profile_id: session!.user.id,
      item_id: data?.[0].id,
      pack_category_id: category.id,
    });

    refetch();
    setType("");
    setDescription("");
    setWeight(0);
    setQuantity(0);
  };

  const addCategory = async () => {
    if (!pack) return;
    const { data } = await createCategory({
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
            {category.categories_item.map((categoriesItem) => (
              <p key={categoriesItem.items?.id}>
                {categoriesItem.items?.type} :{" "}
                {categoriesItem.items?.description}
              </p>
            ))}

            <form
              onSubmit={(event) => {
                event.preventDefault();
                addItem(category);
              }}
              className="form-widget"
            >
              <fieldset>
                <label htmlFor="type">type</label>
                <input
                  id="type"
                  type="text"
                  value={type}
                  placeholder="type"
                  onChange={(e) => setType(e.target.value)}
                />
              </fieldset>
              <fieldset>
                <label htmlFor="description">description</label>
                <input
                  id="description"
                  type="text"
                  value={description}
                  placeholder="description"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </fieldset>
              <fieldset>
                <label htmlFor="weight">weight</label>
                <input
                  id="weight"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(+e.target.value)}
                  placeholder="weight"
                />
              </fieldset>
              <fieldset>
                <label htmlFor="quantity">quantity</label>
                <input
                  id="quantity"
                  type="number"
                  value={quantity}
                  placeholder="quantity"
                  onChange={(e) => setQuantity(+e.target.value)}
                />
              </fieldset>
              <button className="button block primary" type="submit">
                Add Item
              </button>
            </form>
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
