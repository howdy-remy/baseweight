import { useState } from "react";
import { useNavigate } from "react-router";

import {
  Pack as PackType,
  useCreatePackMutation,
  useGetPacksQuery,
} from "api/packs";
import { useAuth } from "contexts/Authentication";

import { Layout } from "components/Layout/Layout";
import {
  HeadingOne,
  HeadingThree,
  HeadingTwo,
  TextSansBold,
  TextSansRegular,
  TextSansRegularItalic,
} from "components/Typography";
import { Button } from "components/Button";
import { Space } from "components/Space";
import { FullPageLoader, Loader } from "components/Loader";
import { Pack } from "components/Pack/Pack";

import { ButtonsWrapper, PacksWrapper, ZeroStateWrapper } from "./packs.styled";
import { PackModal } from "./components/CreatePackModal";
import { AddPackButton } from "./components/AddPackButton.styled";

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

  if (isLoading) {
    return (
      <FullPageLoader>
        <Loader />
      </FullPageLoader>
    );
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
              <TextSansRegular color="cayenne">
                Baseweight helps ultralight backpackers optimize their gear by
                tracking weight distribution across categories. See exactly
                where your heaviest items are and make informed decisions about
                what stays and what goes.
              </TextSansRegular>
              <Space size="xl" />

              <HeadingTwo>Let's get you started</HeadingTwo>
              <Space size="m" />

              <TextSansBold>First, make it yours</TextSansBold>
              <Space size="m" />

              <TextSansRegular>
                Set up your profile so other backpackers can find and follow
                your gear lists. Coming soon!
              </TextSansRegular>
              <Space size="xl" />
              <TextSansRegular>
                <TextSansRegularItalic as="span">
                  Add your username
                </TextSansRegularItalic>{" "}
                – Choose something memorable
              </TextSansRegular>
              <TextSansRegular>
                <TextSansRegularItalic as="span">
                  Upload an avatar
                </TextSansRegularItalic>{" "}
                – Show your trail personality
              </TextSansRegular>
              <Space size="xl" />

              <TextSansBold>Ready to weigh in?</TextSansBold>
              <TextSansRegular>
                Create your first pack and start building your ideal gear list.
                Add items, set weights, and watch your baseweight come together
                in an interactive breakdown.
              </TextSansRegular>
              <Space size="xl" />

              <ButtonsWrapper>
                <Button
                  variant="primary"
                  size="large"
                  onClick={() => navigate("/account")}
                >
                  Set Up Profile
                </Button>
                <Button
                  variant="secondary"
                  size="large"
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
