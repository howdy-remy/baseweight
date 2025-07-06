import {
  HeadingTwo,
  HeadingThree,
  TextSansBold,
  TextSansRegular,
  TextSansRegularItalic,
} from "components/Typography";
import { PackIntroContent } from "features/pack/pack.styled";
import { Space } from "lucide-react";

export const FirstPack = () => (
  <PackIntroContent>
    <HeadingTwo>Your pack is ready to fill</HeadingTwo>
    <Space size="xl" />
    <TextSansBold>
      Start building your gear list by adding categories.
    </TextSansBold>
    <TextSansRegular>
      Categories help organize your gear and make it easy to see weight
      distribution. Common ultralight categories include Shelter, Sleep System,
      Cooking, Clothing, and Electronics – but you can create whatever works for
      your setup.
    </TextSansRegular>
    <Space size="xl" />

    <HeadingThree>Get started</HeadingThree>
    <TextSansRegular>
      <TextSansRegularItalic as="span">
        Add your first category
      </TextSansRegularItalic>{" "}
      – Try starting with your heaviest gear group
    </TextSansRegular>

    <TextSansRegular>
      <TextSansRegularItalic as="span">Then add items</TextSansRegularItalic> –
      Input each piece of gear with its weight{" "}
    </TextSansRegular>
    <TextSansRegular>
      <TextSansRegularItalic as="span">See the breakdown</TextSansRegularItalic>{" "}
      – Watch your pie chart update as you build{" "}
    </TextSansRegular>
    <Space size="xl" />
    <TextSansRegular>
      Your baseweight calculation will update automatically as you add gear.
    </TextSansRegular>
  </PackIntroContent>
);
