import { StyledSpace } from "./Space.styled";
import theme from "../../styles/theme";

type SpaceProps = {
  size: keyof typeof theme.spacing;
};

export const Space = ({ size }: SpaceProps) => {
  return <StyledSpace size={size} />;
};
