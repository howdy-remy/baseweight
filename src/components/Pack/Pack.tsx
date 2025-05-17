import { useEffect, useState } from "react";

import type { Pack as PackType } from "api/packs";

import { convertGramsToUnit } from "utils/unit-conversion";
import { downloadImage } from "utils/download-image";

import { TextMonoRegularItalic, TextSansBold } from "components/Typography";
import { Content, Hero, PackWrapper, StyledLink } from "./Pack.styled";

type PackProps = {
  pack: PackType;
};

export const Pack = ({ pack }: PackProps) => {
  const weightInUnit = convertGramsToUnit(pack.unit, pack.weight || 0);

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  useEffect(() => {
    if (pack.heroUrl) {
      downloadImage(pack.heroUrl, "pack-hero", setImageUrl);
    }
  }, []);

  return (
    <StyledLink to={`packs/${pack.id}`}>
      <PackWrapper>
        {imageUrl ? (
          <Hero src={imageUrl} alt="hero image" />
        ) : (
          <Hero src="/topo.png" alt="topographic map pattern" />
        )}
        <Content>
          <TextSansBold>{pack.name}</TextSansBold>
          <TextMonoRegularItalic>
            {weightInUnit} {pack.unit.toLowerCase()}
          </TextMonoRegularItalic>
        </Content>
      </PackWrapper>
    </StyledLink>
  );
};
