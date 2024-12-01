import { TextSansBold, TextSansRegular } from "../Typography";
import { Chip } from "./ColorChip.styled";

type ColorChipProps = {
  color: string;
  isLight?: boolean;
};
export const ColorChip = ({ color, isLight }: ColorChipProps) => (
  <Chip color={color}>
    <TextSansBold color={isLight ? "white" : "black"}>{color}</TextSansBold>
    <TextSansRegular color="moss" size="mini">
      moss
    </TextSansRegular>
    <TextSansRegular color="lichen" size="mini">
      lichen
    </TextSansRegular>
    <TextSansRegular color="flour" size="mini">
      flour
    </TextSansRegular>
    <TextSansRegular color="black" size="mini">
      black
    </TextSansRegular>
    <TextSansRegular color="white" size="mini">
      white
    </TextSansRegular>
  </Chip>
);
