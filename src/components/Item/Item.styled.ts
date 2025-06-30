import styled, { css } from "styled-components";
import {
  TextMonoBoldItalic,
  TextMonoRegularItalic,
  TextSansBold,
  TextSansRegular,
} from "../Typography";

export const ItemWrapper = styled.div<{
  $isDragging?: boolean;
  $isPublic?: boolean;
}>`
  display: grid;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.m}px;
  grid-row-gap: ${({ theme }) => theme.spacing.s}px;
  grid-template-areas: "draghandle type description weight unit quantity actions";

  ${({ $isPublic }) =>
    $isPublic
      ? css`
          grid-template-columns: max-content 1fr 80px 20px 48px;
          grid-template-areas: "type description weight unit quantity";
        `
      : css`
          grid-template-columns: 24px max-content 1fr 80px 20px 100px 24px;
        `}

  width: 100%;
  height: 32px;
  background-color: ${({ theme }) => theme.colors.white};
  border-top: 1px solid ${({ theme }) => theme.colors.stone};

  ${({ $isDragging }) =>
    $isDragging &&
    css`
      grid-template-columns: 24px max-content 1fr;
      padding: 0 ${({ theme }) => theme.spacing.m}px 0 0;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      border: 0;
    `}

  @media (max-width: 544px) {
    grid-template-columns: 24px 1fr max-content 24px;
    grid-template-areas:
      "draghandle type type actions"
      ". description description ."
      ". quantity weight unit";

    height: auto;
    padding: ${({ theme }) => theme.spacing.s}px 0
      ${({ theme }) => theme.spacing.m}px 0;

    ${({ $isPublic }) =>
      $isPublic
        ? css`
            grid-template-columns: 1fr 20px 48px;
            grid-template-areas:
              "type type type"
              "description description description"
              "weight unit quantity";
          `
        : css`
            grid-template-columns: 24px 1fr max-content 24px;
            grid-template-areas:
              "draghandle type type actions"
              ". description description ."
              ". quantity weight unit";
          `}
  }
`;

export const DragHandleWrapper = styled.div`
  grid-area: draghandle;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  @media (max-width: 544px) {
    grid-row-start: 1;
    grid-row-end: 4;
  }
`;

export const Type = styled(TextSansBold)`
  grid-area: type;
  white-space: nowrap;
`;

export const Description = styled(TextSansRegular)`
  grid-area: description;
  min-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Weight = styled(TextMonoBoldItalic)`
  grid-area: weight;
  text-align: right;
`;

export const Unit = styled(TextMonoBoldItalic)`
  grid-area: unit;
`;

export const Quantity = styled.div`
  grid-area: quantity;
  display: grid;
  grid-template-columns: 24px 1fr 24px;
  gap: ${({ theme }) => theme.spacing.m}px;
  width: 100%;

  @media (max-width: 544px) {
    width: 100px;
  }
`;

export const QuantityText = styled(TextMonoRegularItalic)`
  text-align: right;
`;

export const Actions = styled.div`
  grid-area: actions;
`;
