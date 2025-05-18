import styled, { css } from "styled-components";

export const PackWrapper = styled.div<{ $columns: number }>`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xl}px;
  margin: ${({ theme }) => theme.spacing.xl}px;

  ${({ $columns }) => {
    switch ($columns) {
      case 1:
        return null;
      case 2:
        return css`
          grid-template-columns: 1fr 296px;
        `;
      default:
        return null;
    }
  }};
`;

export const PackHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 5;

  display: grid;
  align-items: center;
  grid-template-columns: 1fr max-content;

  height: 40px;
  padding: ${({ theme: { spacing } }) => `0 ${spacing.s}px 0 ${spacing.xl}px`};
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.lichen};
`;

export const PackActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.m}px;
`;

export const HeaderWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr max-content;
  gap: ${({ theme }) => theme.spacing.xl}px;
`;
export const DescriptionWrapper = styled.div`
  cursor: pointer;
`;
