import { CategoryItem } from "api/category_item";
import { convertGramsToUnit } from "utils/unit-conversion/unit-conversion";
import {
  Description,
  ItemWrapper,
  QuantityText,
  Type,
  Unit,
  Weight,
} from "./Item.styled";

type ItemProps = {
  categoryItem: CategoryItem;
};

export const PublicItem = ({ categoryItem }: ItemProps) => (
  <ItemWrapper $isPublic={true}>
    <Type>{categoryItem.item.type}</Type>
    <Description>{categoryItem.item.description}</Description>
    <Weight>
      {convertGramsToUnit(
        categoryItem.item.unit,
        categoryItem.item.weightInGrams || 0,
      )}{" "}
    </Weight>
    <Unit>{categoryItem.item.unit.toLowerCase()}</Unit>
    <QuantityText>x {categoryItem.quantity}</QuantityText>
  </ItemWrapper>
);
