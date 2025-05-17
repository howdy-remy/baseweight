import styled from "styled-components";
import { Button as HeadlessButton } from "@headlessui/react";
import { IconButtonProps } from "./IconButton";

export const IconButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const IconButtonWrapper = styled(HeadlessButton)<{
  $variant: IconButtonProps["variant"];
  htmlFor?: string;
}>`
  all: unset;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 24px;
  height: 24px;
  border-radius: 4px;

  background-color: ${({ theme, $variant }) => {
    switch ($variant) {
      case "secondary":
        return theme.colors.flour;
      case "primary":
      default:
        return theme.colors.moss;
    }
  }};

  cursor: pointer;

  &:hover {
    background-color: ${({ theme, $variant }) => {
      switch ($variant) {
        case "secondary":
          return theme.colors.sand;
        case "primary":
        default:
          return theme.colors.lichen;
      }
    }};
  }
`;
