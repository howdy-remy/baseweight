import styled from "styled-components";

export const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;

  margin-left: ${({ theme }) => theme.spacing.xxl}px;
  margin-bottom: ${({ theme }) => theme.spacing.l}px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.stone};
`;
