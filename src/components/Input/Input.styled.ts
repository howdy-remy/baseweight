import { Input } from "@headlessui/react";

import styled, { css } from "styled-components";

export const StyledInput = styled(Input)`
  // reset
  all: unset;

  // display
  display: flex;
  align-items: center;
  justify-content: center;

  //box model
  height: 32px;

  width: ${({ theme }) => `calc(100% - ${theme.spacing.m * 2}px)`};
  padding: 0 ${({ theme }) => theme.spacing.m}px;
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

  ${({ disabled }) => {
    if (disabled) {
      return css`
        pointer-events: none;
      `;
    }
  }}

  &:focus {
    outline: 2px solid rgb(2, 156, 253);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.stone};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.mist};
  }
`;
