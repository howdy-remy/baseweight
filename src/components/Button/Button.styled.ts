import styled from "styled-components";
import { Button as HeadlessButton } from "@headlessui/react";

import type { ButtonProps } from "./Button";

export const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StyledButton = styled(HeadlessButton)<{
  $variant: ButtonProps["variant"];
  $size?: ButtonProps["size"];
  $expandWidth: ButtonProps["expandWidth"];
}>`
  // reset
  all: unset;

  // display
  display: flex;
  align-items: center;
  justify-content: center;

  //box model
  height: ${({ $size }) => {
    switch ($size) {
      case "small":
        return "16px";
      case "large":
        return "32px";
      case "medium":
      default:
        return "24px";
    }
  }};
  width: ${({ theme, $expandWidth }) =>
    $expandWidth ? `calc(100% - ${theme.spacing.l * 2}px)` : "fit-content"};
  padding: ${({ theme, $size }) => {
    switch ($size) {
      case "small":
      case "medium":
        return `0 ${theme.spacing.m}px`;
      case "large":
      default:
        return `0 ${theme.spacing.l}px`;
    }
  }};
  border-radius: 4px;

  // color
  background-color: ${({ theme, $variant }) => {
    switch ($variant) {
      case "secondary":
        return theme.colors.white;
      case "primary":
      default:
        return theme.colors.moss;
    }
  }};
  color: ${({ theme, $variant }) => {
    switch ($variant) {
      case "secondary":
        return theme.colors.moss;
      case "primary":
      default:
        return theme.colors.white;
    }
  }};
  border: ${({ theme, $variant }) => {
    switch ($variant) {
      case "secondary":
        return `1px solid ${theme.colors.stone}`;
      case "primary":
      default:
        return `1px solid ${theme.colors.moss}`;
    }
  }};

  // font
  font-family: "Rubik", sans-serif;
  font-size: ${({ theme, $size }) => {
    switch ($size) {
      case "small":
        return theme.fontsizes.s;
      case "medium":
      case "large":
      default:
        return theme.fontsizes.m;
    }
  }};
  font-weight: 500;

  // other
  cursor: pointer;

  &:hover {
    background-color: ${({ theme, $variant }) => {
      switch ($variant) {
        case "secondary":
          return theme.colors.mist;
        case "primary":
        default:
          return theme.colors.lichen;
      }
    }};
  }

  &:focus {
    outline: 1px solid rgb(2, 156, 253);
  }
`;
