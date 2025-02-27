import { CategoryItem } from "api/category_item";
import { convertGramsToUnit } from "utils/unit-conversion/unit-conversion";
import {
  Description,
  ItemWrapper,
  Quantity,
  QuantityText,
  Type,
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
      {categoryItem.item.unit.toLowerCase()}
    </Weight>
    <QuantityText>x {categoryItem.quantity}</QuantityText>
  </ItemWrapper>
);
