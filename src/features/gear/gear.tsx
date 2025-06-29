import { useState } from "react";
import {
  Item,
  useDeleteItemMutation,
  useEditItemMutation,
  useGetItemsQuery,
} from "api/items";

import { Layout } from "components/Layout";
import { HeadingOne } from "components/Typography";
import { GearItem } from "components/GearItem";
import { Space } from "components/Space";

import { GearWrapper } from "./gear.styled";
import { EditGearItemModal } from "./components/EditGearItemModal";
import { ConfirmDeleteGearItemModal } from "./components/ConfirmDeleteGearItemModal";
import { FullPageLoader } from "components/Loader";
import { Loader } from "lucide-react";

export const Gear = () => {
  const { data: gear, refetch, isLoading } = useGetItemsQuery({});

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

  // delete gear item ----------------------------------------------------------
  const [deleteItem] = useDeleteItemMutation();

  const [itemIdToDelete, setItemIdToDelete] = useState<number | null>(null);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

  const deleteGearItem = (id: number) => {
    setItemIdToDelete(id);
    setIsConfirmDeleteOpen(true);
  };

  const confirmDelete = async () => {
    await deleteItem(itemIdToDelete);
    refetch();
    setIsConfirmDeleteOpen(false);
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
    await editGearItemMutation(item);
    refetch();
    setIsCreateItemModalOpen(false);
  };

  if (isLoading) {
    return (
      <FullPageLoader>
        <Loader />
      </FullPageLoader>
    );
  }

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
      <ConfirmDeleteGearItemModal
        isOpen={isConfirmDeleteOpen}
        onSubmit={confirmDelete}
        onClose={() => setIsConfirmDeleteOpen(false)}
      />
      <EditGearItemModal
        item={itemToEdit}
        isOpen={isEditGearItemModalOpen}
        onClose={() => setIsCreateItemModalOpen(false)}
        onSubmit={submitEditItem}
      />
    </Layout>
  );
};
