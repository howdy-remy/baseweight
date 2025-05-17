import type { Pack as PackType } from "api/packs";

import { convertGramsToUnit } from "utils/unit-conversion/unit-conversion";

import { TextMonoRegularItalic, TextSansBold } from "components/Typography";
import { Content, Hero, PackWrapper, StyledLink } from "./Pack.styled";
import { useEffect, useState } from "react";
import { supabase } from "lib/supabaseClient";

type PackProps = {
  pack: PackType;
};

export const Pack = ({ pack }: PackProps) => {
  const weightInUnit = convertGramsToUnit(pack.unit, pack.weight || 0);

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (pack.heroUrl) {
      downloadImage(pack.heroUrl);
    }
  }, []);

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage
        .from("pack-hero")
        .download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setImageUrl(url);
    } catch (error: any) {
      console.log("Error downloading image: ", error.message);
    }
  }

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
