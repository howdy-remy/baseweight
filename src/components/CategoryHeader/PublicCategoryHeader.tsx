import { Unit } from "types/Unit";
import { Category } from "api/categories";
import {
  CategoryColor,
  CategoryName,
  CategoryWrapper,
  Quantity,
  Weight,
} from "./CategoryHeader.styled";

type CategoryHeaderProps = {
  category: Category;
};

export const PublicCategoryHeader = ({ category }: CategoryHeaderProps) => {
  return (
    <CategoryWrapper $isPublic={true}>
      <CategoryColor $color={category.color} />
      <CategoryName as="h2">{category.name}</CategoryName>
      <Weight>
        {category.totalWeight} {Unit.G}
      </Weight>
      <Quantity>x {category.totalQuantity}</Quantity>
    </CategoryWrapper>
  );
};
