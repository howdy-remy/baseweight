import {
  Description as HeadlessDescription,
  Label as HeadlessLabel,
} from "@headlessui/react";
import styled from "styled-components";

export const StyledDescription = styled(HeadlessDescription)`
  margin: ${({ theme }) => theme.spacing.s}px 0;

  font-family: "Rubik", sans-serif;
  font-size: ${({ theme }) => theme.fontsizes.s};
`;

export const StyledLabel = styled(HeadlessLabel)`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.m}px;

  color: ${({ theme }) => theme.colors.moss};

  font-family: "Rubik", sans-serif;
  font-size: ${({ theme }) => theme.fontsizes.m};
  font-weight: 700;
`;
