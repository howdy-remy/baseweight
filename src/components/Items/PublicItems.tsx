import { useEffect, useState } from "react";
import { CategoryItem } from "api/category_item";
import { PublicItem } from "components/Item";
import { ItemsWrapper } from "./Items.styled";

type ItemsProps = {
  items: CategoryItem[];
};

export const PublicItems = ({ items }: ItemsProps) => {
  const [sortedItems, setSortedItems] = useState<CategoryItem[]>([]);

  useEffect(() => {
    const sorted = items.slice().sort((a, b) => a.order - b.order) || [];
    setSortedItems(sorted);
  }, [items]);

  return (
    <ItemsWrapper>
      {sortedItems.map((categoryItem) => (
        <PublicItem
          key={categoryItem.id}
          categoryItem={categoryItem as CategoryItem}
        />
      ))}
    </ItemsWrapper>
  );
};
