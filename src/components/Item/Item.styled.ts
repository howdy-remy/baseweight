import styled, { css } from "styled-components";
import {
  TextMonoBoldItalic,
  TextMonoRegularItalic,
  TextSansBold,
  TextSansRegular,
} from "../Typography";

export const Items = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.m}px;
  margin-left: 22px;
  margin-bottom: ${({ theme }) => theme.spacing.xl}px;
`;

export const ItemWrapper = styled.div<{ $isDragging?: boolean }>`
  display: grid;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.m}px;

  grid-template-columns: 6px max-content 1fr 80px 93px 24px;

  width: 100%;
  height: 32px;
  padding: 0 ${({ theme }) => theme.spacing.m}px;
  background-color: ${({ theme }) => theme.colors.white};

  border: 1px solid ${({ theme }) => theme.colors.sand};
  border-radius: 4px;

  ${({ $isDragging }) =>
    $isDragging &&
    css`
      grid-template-columns: 6px max-content 1fr;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    `}
`;

export const Type = styled(TextSansBold)`
  white-space: nowrap;
`;

export const Description = styled(TextSansRegular)`
  min-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Weight = styled(TextMonoBoldItalic)`
  text-align: right;
`;

export const Quantity = styled.div`
  display: grid;
  grid-template-columns: 24px 1fr 24px;
  gap: ${({ theme }) => theme.spacing.m}px;
  width: 100%;
`;

export const QuantityText = styled(TextMonoRegularItalic)`
  text-align: right;
`;
