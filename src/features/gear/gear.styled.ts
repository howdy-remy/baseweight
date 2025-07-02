import styled from "styled-components";

export const GearWrapper = styled.div`
  margin: ${({ theme }) => theme.spacing.xl}px;
`;

export const ZeroStateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  min-height: ${({ theme }) => `calc(100vh - ${theme.spacing.xl * 2}px)`};
  max-width: 640px;
  padding: ${({ theme }) => theme.spacing.xl}px;
`;
