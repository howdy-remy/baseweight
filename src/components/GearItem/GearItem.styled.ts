import {
  TextMonoBoldItalic,
  TextSansBold,
  TextSansRegular,
} from "components/Typography";
import styled from "styled-components";

export const GearWrapper = styled.div`
  display: grid;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.m}px;
  grid-template-columns: max-content 1fr 80px 24px;

  width: 100%;
  height: 40px;
  padding: ${({ theme }) => theme.spacing.m}px;

  border-top: 1px solid ${({ theme }) => theme.colors.stone};
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
