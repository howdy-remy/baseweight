import {
  Description as HeadlessDescription,
  Label as HeadlessLabel,
  Field as HeadlessField,
} from "@headlessui/react";
import styled from "styled-components";

export const FlexedFields = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.l}px;
  width: 100%;
`;

export const StackedFields = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.l}px;
`;

export const StyledField = styled(HeadlessField)``;

export const StyledDescription = styled(HeadlessDescription)`
  margin: ${({ theme }) => theme.spacing.s}px 0;

  color: ${({ theme }) => theme.colors.thunder};

  font-family: "Rubik", sans-serif;
  font-size: ${({ theme }) => theme.fontsizes.s};
`;

export const StyledLabel = styled(HeadlessLabel)`
  display: block;

  color: ${({ theme }) => theme.colors.black};

  font-family: "Rubik", sans-serif;
  font-size: ${({ theme }) => theme.fontsizes.m};
  font-weight: 500;
`;

export const LabelWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.m}px;
`;
