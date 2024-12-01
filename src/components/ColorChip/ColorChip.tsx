import { TextSansBold, TextSansRegular } from "../Typography";
import { Chip } from "./ColorChip.styled";

type ColorChipProps = {
  color: string;
  isLight?: boolean;
};
export const ColorChip = ({ color, isLight }: ColorChipProps) => (
  <Chip color={color}>
    <TextSansBold color={isLight ? "white" : "black"}>{color}</TextSansBold>
    <TextSansRegular color="moss">moss</TextSansRegular>
    <TextSansRegular color="lichen">lichen</TextSansRegular>
    <TextSansRegular color="flour">flour</TextSansRegular>
    <TextSansRegular color="black">black</TextSansRegular>
    <TextSansRegular color="white">white</TextSansRegular>
  </Chip>
);
