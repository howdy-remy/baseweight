import styled from "styled-components";

export const PackWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 296px;
  gap: ${({ theme }) => theme.spacing.xl}px;

  margin: ${({ theme }) => theme.spacing.xl}px;
`;

export const PackHeader = styled.header`
  position: sticky;
  top: 0;

  display: grid;
  align-items: center;
  grid-template-columns: 1fr max-content;

  height: 40px;
  padding: 0 ${({ theme }) => theme.spacing.xl}px;
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.lichen};
`;

export const PackActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.m}px;
`;
