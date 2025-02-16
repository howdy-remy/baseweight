import styled from "styled-components";

export const ItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.m}px;
  margin-left: 22px;
  margin-bottom: ${({ theme }) => theme.spacing.xl}px;
`;
