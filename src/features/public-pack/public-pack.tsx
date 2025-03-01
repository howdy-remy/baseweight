import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { decode } from "lib/sqids";

import { Category as CategoryType } from "api/categories";
import { useGetPackQuery } from "api/packs";

import { PublicCategoryHeader } from "components/CategoryHeader";
import { IconButton } from "components/IconButton";
import { PublicItems } from "components/Items";
import { Layout } from "components/Layout/Layout";
import { HeadingOne, TextSansRegular } from "components/Typography";

import {
  PackActions,
  PackHeader,
  PackWrapper,
} from "features/pack/pack.styled";

export const PublicPack = () => {
  let { packId } = useParams();

  const { data: pack } = useGetPackQuery({ packId: decode(packId!) });

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
              <>
                <PublicCategoryHeader category={category} />
                <PublicItems items={category.categoryItems} />
              </>
            ))}
          </div>
        </PackWrapper>
      </main>
    </Layout>
  );
};
