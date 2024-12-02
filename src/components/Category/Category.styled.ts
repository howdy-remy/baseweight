import styled from "styled-components";

export const CategoryWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 40px;
`;

export const Block = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.m}px;
`;

export const CategoryColor = styled.div<{ $color: string }>`
  height: 24px;
  width: 24px;
  border-radius: 4px;

  background-color: ${({ $color }) => $color};
`;
