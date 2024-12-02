import { type Item as ItemType } from "../../api/items";
import { DragHandle } from "../DragHandle";
import { Dropdown } from "../Dropdown";
import { TextMonoBoldItalic, TextMonoRegularItalic } from "../Typography";
import { Description, ItemWrapper, Type } from "./Item.styled";

type ItemProps = {
  item: ItemType;
};

export const Item = ({ item }: ItemProps) => {
  const actions = [
    {
      label: "Edit",
      onClick: () => console.log("edit!"),
    },
    {
      label: "Delete",
      onClick: () => console.log("delete!"),
    },
  ];
  return (
    <ItemWrapper>
      <DragHandle />
      <Type>{item.type}</Type>
      <Description>{item.description}</Description>
      <TextMonoBoldItalic>{item.weightInGrams}g</TextMonoBoldItalic>
      <TextMonoRegularItalic>x {item.quantity}</TextMonoRegularItalic>
      <Dropdown useIconButton={true} items={actions} />
    </ItemWrapper>
  );
};
