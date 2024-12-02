import styled from "styled-components";

export const PackWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 296px;
  gap: ${({ theme }) => theme.spacing.xl}px;

  margin: ${({ theme }) => theme.spacing.xl}px 0;
`;
