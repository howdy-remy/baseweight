import styled, { css } from "styled-components";
import {
  HeadingTwo,
  TextMonoBoldItalic,
  TextMonoRegularItalic,
} from "../Typography";

export const CategoryWrapper = styled.div<{ $isPublic?: boolean }>`
  display: grid;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.m}px;

  ${({ $isPublic }) =>
    $isPublic
      ? css`
          grid-template-columns: 24px 1fr 80px 48px;
        `
      : css`
          grid-template-columns: 24px 24px 1fr 80px 48px 24px;
        `}

  width: 100%;
  height: 40px;
`;

export const CategoryColor = styled.div<{ $color: string | null }>`
  height: 24px;
  width: 24px;
  border-radius: 4px;

  background-color: ${({ $color }) => $color};
`;

export const CategoryName = styled(HeadingTwo)`
  min-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Weight = styled(TextMonoBoldItalic)`
  text-align: right;
`;

export const Quantity = styled(TextMonoRegularItalic)`
  text-align: right;
`;
