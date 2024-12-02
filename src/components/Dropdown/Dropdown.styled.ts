import styled from "styled-components";
import {
  Menu as HeadlessMenu,
  MenuButton as HeadlessMenuButton,
  MenuItem as HeadlessMenuItem,
  MenuItems as HeadlessMenuItems,
} from "@headlessui/react";
import { ButtonProps } from "../Button";
import { TextSansRegular } from "../Typography";

export const Menu = styled(HeadlessMenu)``;

export const MenuButton = styled(HeadlessMenuButton)<{
  $isIconButton: boolean;
}>`
  // reset
  all: unset;

  // display
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.s}px;

  // box model
  height: 24px;
  width: ${({ $isIconButton }) => ($isIconButton ? "24px" : "fit-content")};
  padding: 0
    ${({ theme, $isIconButton }) => ($isIconButton ? "0" : theme.spacing.s)}px;
  border-radius: 4px;

  // color
  background-color: ${({ theme }) => theme.colors.flour};
  color: ${({ theme }) => theme.colors.moss};

  // font
  font-family: "Rubik", sans-serif;
  font-size: ${({ theme }) => theme.fontsizes.m};
  font-weight: 700;

  // other
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.sand};
  }

  &:focus {
    outline: 1px solid rgb(2, 156, 253);
  }
`;

export const MenuItem = styled(HeadlessMenuItem)`
  all: unset;
  // box-model
  width: calc(100% - 16px);
  height: 32px;
  margin: 0;
  padding: 0 ${({ theme }) => theme.spacing.m}px;
  border-radius: 4px;

  //font
  font-family: "Rubik", serif;
  font-size: ${({ theme }) => theme.fontsizes.m};
  line-height: 1.4;

  &:hover {
    background-color: ${({ theme }) => theme.colors.flour};
    color: ${({ theme }) => theme.colors.moss};
    cursor: pointer;
  }

  & :focus {
    outline: 1px solid rgb(2, 156, 253);
  }
`;

export const MenuItems = styled(HeadlessMenuItems)`
  // display
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.s}px;

  // box-model
  width: fit-content;
  min-width: 128px;
  padding: ${({ theme }) => theme.spacing.m}px;
  border-radius: 4px;

  // color & effects
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: rgba(15, 15, 15, 0.05) 0px 0px 0px 1px,
    rgba(15, 15, 15, 0.1) 0px 3px 6px, rgba(15, 15, 15, 0.2) 0px 9px 24px;
`;
