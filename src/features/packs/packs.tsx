import { useState } from "react";
import { useNavigate } from "react-router";

import {
  Pack as PackType,
  useCreatePackMutation,
  useGetPacksQuery,
} from "api/packs";
import { useAuth } from "contexts/Authentication";

import { Layout } from "components/Layout/Layout";
import { PackModal } from "./components/CreatePackModal";
import { Pack } from "components/Pack/Pack";
import { PacksWrapper } from "components/Pack/Pack.styled";
import { AddPackButton } from "./components/AddPackButton.styled";
import useScreenSize from "hooks/useScreenSize/useScreenSize";

export const Packs = () => {
  const { session } = useAuth();
  const navigate = useNavigate();

  if (!session) {
    navigate("/login");
  }

  const {
    data: packs,
    isLoading,
    refetch,
  } = useGetPacksQuery({
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
      const { data } = await createPack({
        name,
        unit,
      });
      const id = data?.[0].id;
      navigate(`/packs/${id}`);
      refetch();
    }
  };

  const { width } = useScreenSize();

  if (isLoading) {
    return "loading...";
  }

  return (
    <div>
      <Layout>
        <div>
          <PacksWrapper>
            <AddPackButton onClick={() => setIsPackModalOpen(true)}>
              Add pack
            </AddPackButton>
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
