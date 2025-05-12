import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { Unit } from "types/Unit";

import { Category as CategoryType } from "api/categories";
import { useGetPackQuery, useUpdatePackMutation } from "api/packs";

import { Layout } from "components/Layout/Layout";
import { TextSansRegular } from "components/Typography";
import { Button } from "components/Button";
import { Input } from "components/Input";
import { Field } from "components/Field";
import { ActionsWrapper } from "components/Modal";
import { Select } from "components/Select";
import { TextArea } from "components/TextArea";

import { convertGramsToUnit } from "utils/unit-conversion/unit-conversion";

import { PackHeader, PackWrapper } from "features/pack/pack.styled";
import { StyledForm } from "./pack-edit.styled";

export const PackEdit = () => {
  let { packId } = useParams();

  const { data: pack, isLoading, refetch } = useGetPackQuery({ packId });
  const [sortedCategories, setSortedCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    const sorted =
      pack?.categories.slice().sort((a, b) => a.order - b.order) || [];
    setSortedCategories(sorted);
  }, [pack]);

  const packTotalWeight = sortedCategories.reduce((acc, { totalWeight }) => {
    return acc + totalWeight;
  }, 0);

  // form ----------------------------------------------------------------------
  const [packName, setPackName] = useState<string | null | undefined>(
    pack?.name,
  );

  const [packDescription, setPackDescription] = useState<
    string | null | undefined
  >(pack?.description);

  const [unit, setUnit] = useState<Unit>(pack?.unit || Unit.G);

  // actions -------------------------------------------------------------------
  const navigate = useNavigate();
  const exitEdit = () => {
    navigate(`/packs/${pack?.id}`);
  };

  const [updatePack, {}] = useUpdatePackMutation();

  const submit = async () => {
    const { data } = await updatePack([
      {
        id: pack?.id,
        name: packName,
        description: packDescription,
        unit,
      },
    ]);
    await refetch();
    navigate(`/packs/${pack?.id}`);
  };

  // render --------------------------------------------------------------------
  if (isLoading) {
    return "loading...";
  }
  return (
    <Layout>
      <main>
        <PackHeader>
          <TextSansRegular>
            {pack?.name} | {convertGramsToUnit(pack!.unit, packTotalWeight)}{" "}
            {pack?.unit.toLowerCase()}
          </TextSansRegular>
        </PackHeader>
        <PackWrapper>
          <div>
            <StyledForm
              onSubmit={(event) => {
                event.preventDefault();
                submit();
              }}
              role="form"
            >
              <Field label="Name">
                <Input
                  value={packName ?? ""}
                  placeholder={pack?.name ?? ""}
                  name="name"
                  onChange={(e) => setPackName(e.target.value)}
                />
              </Field>
              <Field label="Description">
                <TextArea
                  value={packDescription ?? ""}
                  name="description"
                  onChange={(e) => setPackDescription(e.target.value)}
                />
              </Field>
              <Field label="Unit">
                <Select
                  variant="primary"
                  buttonSize="large"
                  onChange={(e) => setUnit(e.target.value as Unit)}
                  value={unit}
                >
                  <option value={Unit.OZ}>oz</option>
                  <option value={Unit.LB}>lb</option>
                  <option value={Unit.G}>g</option>
                  <option value={Unit.KG}>kg</option>
                </Select>
              </Field>
              <ActionsWrapper>
                <Button variant="secondary" size="medium" onClick={exitEdit}>
                  Cancel
                </Button>
                <Button variant="primary" size="medium" type="submit">
                  Save
                </Button>
              </ActionsWrapper>
            </StyledForm>
          </div>
        </PackWrapper>
      </main>
    </Layout>
  );
};
