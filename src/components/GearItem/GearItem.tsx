import { Item } from "api/items";
import { convertGramsToUnit } from "utils/unit-conversion";

import { Description, Type, Weight } from "components/Item";
import { Dropdown } from "components/Dropdown";
import { GearWrapper } from "./GearItem.styled";

type GearItemProps = {
  item: Item;
  deleteGearItem: (id: number) => void;
  editGearItem: (item: Item) => void;
};

export const GearItem = ({
  item,
  editGearItem,
  deleteGearItem,
}: GearItemProps) => {
  // actions -------------------------------------------------------------------
  const actions = [
    {
      label: "Edit",
      onClick: () => editGearItem(item),
    },
    {
      label: "Delete",
      onClick: () => deleteGearItem(item.id),
    },
  ];

  return (
    <GearWrapper>
      <Type>{item.type}</Type>
      <Description>{item.description}</Description>
      <Weight>
        {convertGramsToUnit(item.unit, item.weightInGrams || 0)}{" "}
        {item.unit.toLowerCase()}
      </Weight>
      <Dropdown useIconButton={true} items={actions} />
    </GearWrapper>
  );
};
