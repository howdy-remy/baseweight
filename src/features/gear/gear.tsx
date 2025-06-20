import { useState } from "react";
import { Item, useEditItemMutation, useGetItemsQuery } from "api/items";

import { Layout } from "components/Layout";
import { HeadingOne } from "components/Typography";
import { GearItem } from "components/GearItem";
import { Space } from "components/Space";

import { GearWrapper } from "./gear.styled";
import { EditGearItemModal } from "./components/EditGearItemModal";

export const Gear = () => {
  const { data: gear, refetch } = useGetItemsQuery({});

  const sortedGear = [...(gear || [])].sort((a, b) => {
    const aType = a.type?.toLowerCase() || "";
    const bType = b.type?.toLowerCase() || "";
    if (aType < bType) {
      return -1;
    }
    if (aType > bType) {
      return 1;
    }
    return 0;
  });

  const deleteGearItem = (id: number) => {
    console.log(`Delete item with id: ${id}`);
    // Implement deletion logic here
  };

  // edit gear item ------------------------------------------------------------
  const [editGearItemMutation] = useEditItemMutation();

  const [itemToEdit, setItemToEdit] = useState<Item | null>(null);
  const [isEditGearItemModalOpen, setIsCreateItemModalOpen] = useState(false);

  const editGearItem = (item: Item) => {
    setItemToEdit(item);
    setIsCreateItemModalOpen(true);
  };

  const submitEditItem = async (item: Item) => {
    editGearItemMutation(item);
    refetch();
    setIsCreateItemModalOpen(false);
  };

  return (
    <Layout>
      <GearWrapper>
        <HeadingOne as="h1">All Gear</HeadingOne>
        <Space size="xl" />
        {sortedGear?.map((item) => (
          <GearItem
            item={item}
            key={item.id}
            deleteGearItem={deleteGearItem}
            editGearItem={editGearItem}
          />
        ))}
      </GearWrapper>
      <EditGearItemModal
        item={itemToEdit}
        isOpen={isEditGearItemModalOpen}
        onClose={() => setIsCreateItemModalOpen(false)}
        onSubmit={submitEditItem}
      />
    </Layout>
  );
};
