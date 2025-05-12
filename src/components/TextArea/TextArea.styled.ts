import { Textarea } from "@headlessui/react";

import styled, { css } from "styled-components";

export const StyledTextArea = styled(Textarea)`
  // reset
  all: unset;

  // display
  display: flex;
  align-items: center;
  justify-content: center;

  //box model
  width: ${({ theme }) => `calc(100% - ${theme.spacing.m * 2 + 2}px)`};
  padding: ${({ theme }) => theme.spacing.m}px;
  border: 1px solid ${({ theme }) => theme.colors.stone};
  border-radius: 4px;

  // color
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.moss};

  // font
  font-family: "Rubik", sans-serif;
  font-size: ${({ theme }) => theme.fontsizes.m};

  // other
  cursor: pointer;
  resize: vertical;

  ${({ disabled }) => {
    if (disabled) {
      return css`
        pointer-events: none;
      `;
    }
  }}

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.black};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.stone};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.mist};
  }
`;
