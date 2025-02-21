import styled from "styled-components";
import { Select as HeadlessSelect } from "@headlessui/react";
import { SelectProps } from "./Select";

export const StyledSelect = styled(HeadlessSelect)<{
  $variant: SelectProps["variant"];
  $buttonSize?: SelectProps["buttonSize"];
  $expandWidth: SelectProps["expandWidth"];
}>`
  // reset
  all: unset;

  // display
  display: flex;
  align-items: center;
  justify-content: center;

  //box model
  height: ${({ $buttonSize }) => {
    switch ($buttonSize) {
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
  padding: ${({ theme, $buttonSize }) => {
    switch ($buttonSize) {
      case "small":
      case "medium":
        return `0 ${theme.spacing.xxxl}px 0 ${theme.spacing.m}px`;
      case "large":
      default:
        return `0 ${theme.spacing.xxxl}px 0 ${theme.spacing.l}px`;
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
  font-size: ${({ theme, $buttonSize }) => {
    switch ($buttonSize) {
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
  /* Arrow */
  appearance: none;
  background-image: url("/icons/CaretDown.svg");
  background-repeat: no-repeat;
  background-position: right 8px top 50%;
  background-size: 20px 20px;

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

    border: ${({ theme, $variant }) => {
      switch ($variant) {
        case "secondary":
          return `1px solid ${theme.colors.mist}`;
        case "primary":
        default:
          return `1px solid ${theme.colors.lichen}`;
      }
    }};
  }

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.black};
  }
`;
