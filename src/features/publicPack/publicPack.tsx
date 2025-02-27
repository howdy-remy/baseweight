import { Category as CategoryType } from "api/categories";
import { useGetPackQuery } from "api/packs";
import { CategoryHeader } from "components/CategoryHeader";
import { IconButton } from "components/IconButton";
import { Layout } from "components/Layout/Layout";
import { HeadingOne, TextSansRegular } from "components/Typography";

import {
  PackActions,
  PackHeader,
  PackWrapper,
} from "features/pack/pack.styled";
import { decode } from "lib/sqids";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Unit } from "types/Unit";

export const PublicPack = () => {
  let { packId } = useParams();

  const {
    data: pack,
    isLoading,
    refetch,
  } = useGetPackQuery({ packId: decode(packId!) });

  const [sortedCategories, setSortedCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    const sorted =
      pack?.categories.slice().sort((a, b) => a.order - b.order) || [];
    setSortedCategories(sorted);
  }, [pack]);

  return (
    <Layout>
      <main>
        <PackHeader>
          <TextSansRegular>{pack?.name} | weight</TextSansRegular>
          <PackActions>
            <IconButton icon="chat" variant="secondary" />
            <IconButton icon="star" variant="secondary" />
          </PackActions>
        </PackHeader>
        <PackWrapper>
          <div>
            <HeadingOne as="h1">{pack?.name}</HeadingOne>
            <TextSansRegular>Lorem ipsum</TextSansRegular>
            {sortedCategories.map((category, i) => (
              <CategoryHeader
                name={category.name}
                color={category.color}
                isPublic
                quantity={category.totalQuantity}
                weight={category.totalWeight}
                weightUnit={Unit.G}
              />
            ))}
          </div>
        </PackWrapper>
      </main>
    </Layout>
  );
};
