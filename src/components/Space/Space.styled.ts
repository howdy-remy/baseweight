import styled from "styled-components";
import theme from "../../styles/theme";

export const StyledSpace = styled.div<{ size: keyof typeof theme.spacing }>`
  width: 100%;
  height: ${({ size, theme }) => theme.spacing[size]}px;
`;
