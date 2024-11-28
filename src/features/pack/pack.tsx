import { Link, useParams } from "react-router";
import { useGetPackQuery } from "../../api/packs";
import { Layout } from "../../components/Layout/Layout";
import { FormEventHandler, useState } from "react";
import { Item, useCreateItemMutation } from "../../api/items";
import { useAuth } from "../../contexts/Authentication";
import { useCreatePackCategoryItemMutation } from "../../api/packCategoryItem";

export const Pack = () => {
  const { session } = useAuth();
  let { packId } = useParams();

  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [weight, setWeight] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const { data: pack, isLoading, refetch } = useGetPackQuery({ packId });
  const [createItem] = useCreateItemMutation();
  const [createPackCategoryItem] = useCreatePackCategoryItemMutation();
  const addItem = async (packCategory) => {
    const { data } = await createItem({
      profile_id: session?.user.id,
      type,
      description,
      weight_in_grams: weight,
      quantity,
    });
    await createPackCategoryItem({
      profile_id: session?.user.id,
      item_id: data?.[0].id,
      pack_category_id: packCategory.id,
    });

    refetch();
    setType("");
    setDescription("");
    setWeight(0);
    setQuantity(0);
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
        {pack?.pack_category.map((packCategory) => (
          <>
            <p key={packCategory.id}>{packCategory.name}</p>
            {packCategory.pack_category_item.map((packCategoryItem) => (
              <p key={packCategoryItem.item?.id}>
                {packCategoryItem.item?.type} :{" "}
                {packCategoryItem.item?.description}
              </p>
            ))}

            <form
              onSubmit={(event) => {
                event.preventDefault();
                addItem(packCategory);
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
      </div>
    </Layout>
  );
};
