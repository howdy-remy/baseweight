import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";

import Markdown from "react-markdown";
import remarkMdx from "remark-mdx";
import remarkGfm from "remark-gfm";
import rehypeFormat from "rehype-format";

import { decode } from "lib/sqids";

import { Category as CategoryType } from "api/categories";
import { useGetPackQuery } from "api/packs";

import { convertGramsToUnit } from "utils/unit-conversion";

import { PublicCategoryHeader } from "components/CategoryHeader";
import { PublicItems } from "components/Items";
import { Layout } from "components/Layout/Layout";
import { HeadingOne, TextSansRegular } from "components/Typography";
import { PieChart } from "components/PieChart";

import {
  PackHeader,
  PackHeaderAccount,
  PackWrapper,
} from "features/pack/pack.styled";
import { PackHero } from "components/PackHero";
import { Avatar } from "components/Avatar";
import { Unit } from "types/Unit";

export const PublicPack = () => {
  let { packId } = useParams();

  const { data: pack } = useGetPackQuery({ packId: decode(packId!) });

  const [sortedCategories, setSortedCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    const sorted =
      pack?.categories?.slice().sort((a, b) => a.order - b.order) || [];
    setSortedCategories(sorted);
  }, [pack]);

  const packTotalWeight = sortedCategories.reduce((acc, { totalWeight }) => {
    return acc + totalWeight;
  }, 0);

  const chartData = sortedCategories.map((category) => ({
    label: category.name || "unnamed",
    value: category.totalWeight,
  }));
  const chartColors = sortedCategories.map(
    (category) => category.color || "#D13D1F",
  );

  const weightRanking = useMemo(() => {
    const packWeightInPounds = convertGramsToUnit(Unit.LB, packTotalWeight);
    switch (true) {
      case packWeightInPounds < 5:
        return "SUPERULTRALIGHT";
      case packWeightInPounds < 10:
        return "ULTRALIGHT";
      case packWeightInPounds < 20:
        return "LIGHTWEIGHT";
      default:
        return "TRADITIONAL";
    }
  }, [packTotalWeight]);

  if (!pack) {
    return <p>pack not found</p>;
  }

  return (
    <Layout>
      <main>
        <PackHeader>
          <TextSansRegular>
            {pack.name} | {convertGramsToUnit(pack.unit, packTotalWeight)}{" "}
            {pack.unit.toLowerCase()}
          </TextSansRegular>
          <PackHeaderAccount>
            <TextSansRegular>{pack.profile?.username}</TextSansRegular>
            <Avatar
              url={pack.profile?.avatarUrl || null}
              size={32}
              initial={
                !!pack.profile?.username?.length
                  ? pack.profile.username[0]
                  : "?"
              }
            />
          </PackHeaderAccount>
        </PackHeader>
        <PackHero url={pack.heroUrl} />

        <PackWrapper $columns={1}>
          <HeadingOne as="h1">{pack?.name}</HeadingOne>
          <div className="display">
            <Markdown
              remarkPlugins={[remarkMdx, remarkGfm]}
              rehypePlugins={[rehypeFormat]}
            >
              {pack?.description}
            </Markdown>
          </div>
        </PackWrapper>
        <PackWrapper $columns={2}>
          <div>
            {sortedCategories.map((category, i) => (
              <React.Fragment key={category.id}>
                <PublicCategoryHeader category={category} unit={pack.unit} />
                <PublicItems items={category.categoryItems} />
              </React.Fragment>
            ))}
          </div>
          <PieChart
            width={296}
            height={296}
            data={chartData}
            colors={chartColors}
          >
            <HeadingOne as="p">
              {convertGramsToUnit(pack.unit, packTotalWeight)}{" "}
              {pack.unit.toLowerCase()}
            </HeadingOne>
            <TextSansRegular>{weightRanking}</TextSansRegular>
          </PieChart>
        </PackWrapper>
      </main>
    </Layout>
  );
};
