import { useState } from "react";

import {
  Pack as PackType,
  useCreatePackMutation,
  useGetPacksQuery,
} from "api/packs";
import { useAuth } from "contexts/Authentication";

import { Layout } from "components/Layout/Layout";
import { Button } from "components/Button";
import { PackModal } from "./components/CreatePackModal";
import { Pack } from "components/Pack/Pack";
import { PacksWrapper } from "components/Pack/Pack.styled";

export const Packs = () => {
  const { session } = useAuth();
  const { data: packs, isLoading } = useGetPacksQuery({
    userId: session?.user.id,
  });

  const [packToEdit, setPackToEdit] = useState<PackType | null>(null);
  const [isPackModalOpen, setIsPackModalOpen] = useState<boolean>(false);

  const onClosePackModal = () => {
    setPackToEdit(null);
    setIsPackModalOpen(false);
  };

  const [createPack] = useCreatePackMutation();
  const onSubmitPackModal = async ({ name, unit, id }: Partial<PackType>) => {
    if (!id) {
      createPack({
        name,
        unit,
      });
    }
  };

  if (isLoading) {
    return "loading...";
  }

  return (
    <div>
      <Layout>
        <div>
          {/* add pack button ---------------------------------------------- */}
          <Button
            variant="secondary"
            size="large"
            expandWidth
            onClick={() => setIsPackModalOpen(true)}
          >
            Add pack
          </Button>
          <PacksWrapper>
            {packs?.map((pack) => <Pack pack={pack} key={pack.id} />)}
          </PacksWrapper>

          {/* modals ------------------------------------------------------- */}
          <PackModal
            initialProps={
              packToEdit
                ? {
                    id: packToEdit.id,
                    name: packToEdit.name,
                    unit: packToEdit.unit,
                  }
                : null
            }
            isOpen={isPackModalOpen}
            onClose={onClosePackModal}
            onSubmit={onSubmitPackModal}
          />
        </div>
      </Layout>
    </div>
  );
};
