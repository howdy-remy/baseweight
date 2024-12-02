import { type Item as ItemType } from "../../api/items";
import { DragHandle } from "../DragHandle";
import { IconButton } from "../IconButton";
import {
  TextMonoBoldItalic,
  TextMonoRegularItalic,
  TextSansBold,
  TextSansRegular,
} from "../Typography";
import { Block, Description, ItemWrapper, Type } from "./Item.styled";

type ItemProps = {
  item: ItemType;
};

export const Item = ({ item }: ItemProps) => {
  return (
    <ItemWrapper>
      <DragHandle />
      <Type>{item.type}</Type>
      <Description>{item.description}</Description>
      <TextMonoBoldItalic>{item.weightInGrams}g</TextMonoBoldItalic>
      <TextMonoRegularItalic>x {item.quantity}</TextMonoRegularItalic>
      <IconButton variant="secondary" icon="menu" />
    </ItemWrapper>
  );
};
