import React, { useState } from "react";
import { Link } from "react-router";

import { Pack, useGetPacksQuery } from "api/packs";
import { useAuth } from "contexts/Authentication";

import { Layout } from "components/Layout/Layout";
import { Button } from "components/Button";
import { PackModal } from "./components/CreatePackModal";

export const Packs = () => {
  const { session } = useAuth();
  const { data: packs, isLoading } = useGetPacksQuery({
    userId: session?.user.id,
  });

  const [packToEdit, setPackToEdit] = useState<Pack | null>(null);
  const [isPackModalOpen, setIsPackModalOpen] = useState<boolean>(false);

  const onClosePackModal = () => {
    setPackToEdit(null);
    setIsPackModalOpen(false);
  };

  const onSubmitPackModal = async ({ name, unit, id }: Partial<Pack>) => {
    console.log("submit");
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

          {packs?.map((pack) => (
            <React.Fragment key={pack.id}>
              <Link to={`packs/${pack.id}`}>{pack.name}</Link>
            </React.Fragment>
          ))}

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
