import type { Pack as PackType } from "api/packs";

import { convertGramsToUnit } from "utils/unit-conversion/unit-conversion";

import { TextMonoBold, TextSerifBold } from "components/Typography";
import { PackWrapper, StyledLink } from "./Pack.styled";

type PackProps = {
  pack: PackType;
};

export const Pack = ({ pack }: PackProps) => {
  const weightInUnit = convertGramsToUnit(pack.unit, pack.weight || 0);
  return (
    <StyledLink to={`packs/${pack.id}`}>
      <PackWrapper>
        <TextSerifBold>{pack.name}</TextSerifBold>
        <TextMonoBold>
          {weightInUnit} {pack.unit.toLowerCase()}
        </TextMonoBold>
      </PackWrapper>
    </StyledLink>
  );
};
