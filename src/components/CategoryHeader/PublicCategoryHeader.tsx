import { Category } from "api/categories";
import { Unit } from "types/Unit";
import { convertGramsToUnit } from "utils/unit-conversion";
import {
  CategoryColor,
  CategoryName,
  CategoryWrapper,
  Quantity,
  Weight,
} from "./CategoryHeader.styled";

type CategoryHeaderProps = {
  category: Category;
  unit: Unit;
};

export const PublicCategoryHeader = ({
  category,
  unit,
}: CategoryHeaderProps) => {
  const totalWeight = convertGramsToUnit(unit, category.totalWeight);

  return (
    <CategoryWrapper $isPublic={true}>
      <CategoryColor $color={category.color} />
      <CategoryName as="h2">{category.name}</CategoryName>
      <Weight>
        {totalWeight} {unit.toLowerCase()}
      </Weight>
      <Quantity>x {category.totalQuantity}</Quantity>
    </CategoryWrapper>
  );
};
