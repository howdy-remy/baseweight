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

  @media (max-width: 1060px) {
    // 296 = sidebar width
    width: ${({ theme }) => `calc(100vw - ${296 + theme.spacing.xl * 2}px)`};
    grid-template-columns: 1fr;
    & > :first-child {
      position: static;
      ${({ $columns }) =>
        $columns === 2 &&
        css`
          order: 2;
        `};
    }
  }

  @media (max-width: 768px) {
    width: ${({ theme }) => `calc(100vw - ${theme.spacing.xl * 2}px)`};
  }
`;

export const PackIntroContent = styled.div`
  margin: ${({ theme }) => theme.spacing.xl}px;
`;

export const PackHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 5;

  display: grid;
  align-items: center;
  grid-template-columns: 1fr max-content;

  height: 40px;
  padding: ${({ theme: { spacing } }) => `0 ${spacing.l}px 0 ${spacing.xl}px`};
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.lichen};
`;

export const PackHeaderAccount = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.m}px;
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
