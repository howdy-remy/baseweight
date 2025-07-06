import { useState } from "react";
import {
  Item,
  useCreateItemMutation,
  useDeleteItemMutation,
  useEditItemMutation,
  useGetItemsQuery,
} from "api/items";
import { Unit } from "types/Unit";

import { Layout } from "components/Layout";
import {
  HeadingOne,
  HeadingThree,
  HeadingTwo,
  TextSansRegular,
  TextSansRegularItalic,
} from "components/Typography";
import { Space } from "components/Space";
import { Button } from "components/Button";
import { FullPageLoader, Loader } from "components/Loader";
import { GearItem } from "components/GearItem";

import { EditGearItemModal } from "./components/EditGearItemModal";
import { ConfirmDeleteGearItemModal } from "./components/ConfirmDeleteGearItemModal";
import { CreateGearItemModal } from "./components/CreateGearItemModal/CreateGearItemModal";

import { GearWrapper, ZeroStateWrapper } from "./gear.styled";

export type OnSubmitItemProps = {
  type: string;
  description: string;
  weightInGrams: number;
  unit: Unit;
};

export const Gear = () => {
  const { data: gear, isLoading } = useGetItemsQuery({});

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

  // create gear item ----------------------------------------------------------
  const [isCreateItemModalOpen, setIsCreateItemModalOpen] = useState(false);
  const [createItem] = useCreateItemMutation();

  const submitCreateItem = async ({
    type,
    description,
    weightInGrams,
    unit,
  }: OnSubmitItemProps) => {
    const { data } = await createItem({
      type,
      description,
      weight_in_grams: weightInGrams,
      unit,
    });

    setIsCreateItemModalOpen(false);
  };

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
    setIsConfirmDeleteOpen(false);
  };

  // edit gear item ------------------------------------------------------------
  const [editGearItemMutation] = useEditItemMutation();

  const [itemToEdit, setItemToEdit] = useState<Item | null>(null);
  const [isEditGearItemModalOpen, setIsEditItemModalOpen] = useState(false);

  const editGearItem = (item: Item) => {
    setItemToEdit(item);
    setIsEditItemModalOpen(true);
  };

  const submitEditItem = async (item: Item) => {
    await editGearItemMutation(item);
    setIsEditItemModalOpen(false);
  };

  if (isLoading) {
    return (
      <FullPageLoader>
        <Loader />
      </FullPageLoader>
    );
  }

  if (!gear || gear.length === 0) {
    return (
      <Layout>
        <ZeroStateWrapper>
          <HeadingOne as="h1">Your gear library is empty</HeadingOne>
          <HeadingThree as="h2">
            Build your collection of ultralight essentials.
          </HeadingThree>
          <Space size="xxxl" />

          <TextSansRegular>
            This is where all your gear lives. Every item you add here becomes
            part of your personal gear library, making it easy to reuse across
            different pack configurations.
          </TextSansRegular>
          <Space size="xl" />

          <HeadingTwo>Get started</HeadingTwo>
          <TextSansRegular>
            <TextSansRegularItalic as="span">
              Add your first item
            </TextSansRegularItalic>{" "}
            – Input gear type, description, and weight.
          </TextSansRegular>
          <TextSansRegular>
            <TextSansRegularItalic as="span">
              Build your library
            </TextSansRegularItalic>{" "}
            – Add all your current gear to have it ready for future packs
          </TextSansRegular>
          <TextSansRegular>
            <TextSansRegularItalic as="span">
              Organize and optimize
            </TextSansRegularItalic>{" "}
            – See all your gear in one place to spot weight-saving opportunities
          </TextSansRegular>
          <Space size="xl" />

          <TextSansRegular>
            Once you start adding gear, you'll be able to quickly build new
            packs by selecting from your existing items.
          </TextSansRegular>
          <Space size="xl" />

          <Button
            variant="secondary"
            size="large"
            expandWidth
            onClick={() => setIsCreateItemModalOpen(true)}
          >
            Add item
          </Button>
          <CreateGearItemModal
            isOpen={isCreateItemModalOpen}
            onClose={() => setIsCreateItemModalOpen(false)}
            onSubmit={submitCreateItem}
          />
        </ZeroStateWrapper>
      </Layout>
    );
  }

  return (
    <Layout>
      <GearWrapper>
        <HeadingOne as="h1">All Gear</HeadingOne>
        <Space size="xl" />
        <Button
          variant="secondary"
          size="large"
          expandWidth
          onClick={() => setIsCreateItemModalOpen(true)}
        >
          Add item
        </Button>
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
        onClose={() => setIsEditItemModalOpen(false)}
        onSubmit={submitEditItem}
      />
      <CreateGearItemModal
        isOpen={isCreateItemModalOpen}
        onClose={() => setIsCreateItemModalOpen(false)}
        onSubmit={submitCreateItem}
      />
    </Layout>
  );
};
