import { Menu } from "@headlessui/react";
import { MenuButton, MenuItem, MenuItems } from "./Dropdown.styled";
import theme from "../../styles/theme";

type DropdownProps = {
  items: {
    label: string;
    onClick: () => void;
  }[];
  label?: string;
  useIconButton?: boolean;
};

export const Dropdown = ({ label, items, useIconButton }: DropdownProps) => {
  return (
    <Menu>
      {useIconButton ? (
        <MenuButton $isIconButton={true}>
          <img src="/icons/Menu-moss.png" />
        </MenuButton>
      ) : (
        <MenuButton $isIconButton={false}>
          {label} <img src="/icons/CaretDown-moss.png" />
        </MenuButton>
      )}
      <MenuItems
        anchor={{
          to: "bottom end",
          gap: theme.spacing.s,
        }}
      >
        {items.map(({ label, onClick }) => (
          <MenuItem as="button" onClick={onClick}>
            {label}
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
};
