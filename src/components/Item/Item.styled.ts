import styled from "styled-components";
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

export const ItemWrapper = styled.div`
  display: grid;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.m}px;

  grid-template-columns: 6px max-content 1fr 80px 48px 24px;

  width: 100%;
  height: 32px;
  padding: 0 ${({ theme }) => theme.spacing.m}px;

  border: 1px solid ${({ theme }) => theme.colors.sand};
  border-radius: 4px;
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

export const Quantity = styled(TextMonoRegularItalic)`
  text-align: right;
`;

export const Block = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.m}px;
`;
