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
import { ButtonsWrapper, PacksWrapper, ZeroStateWrapper } from "./packs.styled";
import { AddPackButton } from "./components/AddPackButton.styled";
import useScreenSize from "hooks/useScreenSize/useScreenSize";
import {
  HeadingOne,
  HeadingThree,
  HeadingTwo,
  TextSansBold,
  TextSansRegular,
} from "components/Typography";
import { Button } from "components/Button";
import { Space } from "components/Space";

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
          {packs?.length === 0 ? (
            <ZeroStateWrapper>
              <HeadingOne as="h1" color="moss">
                Welcome to Baseweight
              </HeadingOne>
              <HeadingThree as="h2">
                Track every ounce. Perfect your pack
              </HeadingThree>
              <Space size="xxxl" />
              <TextSansBold color="cayenne">
                Baseweight helps ultralight backpackers optimize their gear by
                tracking weight distribution across categories. See exactly
                where your heaviest items are and make informed decisions about
                what stays and what goes.
              </TextSansBold>
              <Space size="xl" />

              <HeadingTwo>Let's get you started</HeadingTwo>
              <Space size="m" />

              <HeadingThree>First, make it yours</HeadingThree>
              <Space size="m" />

              <TextSansRegular>
                Set up your profile so other backpackers can find and follow
                your gear lists.
              </TextSansRegular>
              <Space size="xl" />
              <TextSansRegular>
                <TextSansBold as="span">Add your username</TextSansBold> –
                Choose something memorable
              </TextSansRegular>
              <TextSansRegular>
                <TextSansBold as="span">Upload an avatar</TextSansBold> – Show
                your trail personality
              </TextSansRegular>
              <Space size="xl" />

              <HeadingThree>Ready to weigh in?</HeadingThree>
              <TextSansRegular>
                Create your first pack and start building your ideal gear list.
                Add items, set weights, and watch your baseweight come together
                in an interactive breakdown.
              </TextSansRegular>
              <Space size="xl" />

              <ButtonsWrapper>
                <Button
                  variant="primary"
                  size="medium"
                  onClick={() => navigate("/account")}
                >
                  Set Up Profile
                </Button>
                <Button
                  variant="secondary"
                  size="medium"
                  onClick={() => setIsPackModalOpen(true)}
                >
                  Create First Pack
                </Button>
              </ButtonsWrapper>
            </ZeroStateWrapper>
          ) : (
            <PacksWrapper>
              <AddPackButton onClick={() => setIsPackModalOpen(true)}>
                Add pack
              </AddPackButton>
              {packs?.map((pack) => <Pack pack={pack} key={pack.id} />)}
            </PacksWrapper>
          )}

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
