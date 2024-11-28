import { Link, useParams } from "react-router";
import { useGetPackQuery } from "../../api/packs";
import { Layout } from "../../components/Layout/Layout";

export const Pack = () => {
  let { packId } = useParams();

  const { data: pack, isLoading } = useGetPackQuery({ packId });

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
              <p key={packCategoryItem.item.id}>
                {packCategoryItem.item.type} :{" "}
                {packCategoryItem.item.description}
              </p>
            ))}
          </>
        ))}
      </div>
    </Layout>
  );
};
