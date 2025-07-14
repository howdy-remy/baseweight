import { Space } from "components/Space";
import {
  HeadingTwo,
  TextSansBold,
  TextSansRegular,
  TextSansRegularItalic,
} from "components/Typography";
import { PackIntroContent } from "features/pack/pack.styled";

export const NthPack = () => (
  <PackIntroContent>
    <HeadingTwo>Ready for your next build?</HeadingTwo>
    <Space size="xl" />
    <TextSansBold>Time to optimize another pack configuration.</TextSansBold>
    <TextSansRegular>
      Whether you're planning a different trip, testing new gear combinations,
      or building a seasonal variant, this pack is ready for your next
      ultralight experiment.
    </TextSansRegular>
    <Space size="xl" />

    <TextSansBold>Build your setup</TextSansBold>
    <TextSansRegular>
      <TextSansRegularItalic as="span">
        Add categories and gear{" "}
      </TextSansRegularItalic>
      – Start fresh with a new configuration
    </TextSansRegular>
    <TextSansRegular>
      <TextSansRegularItalic as="span">
        Reuse existing gear{" "}
      </TextSansRegularItalic>
      – As you type gear names, your previous items will appear as suggestions
    </TextSansRegular>
  </PackIntroContent>
);
