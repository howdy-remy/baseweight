import styled from "styled-components";

import { DialogBackdrop, DialogPanel } from "@headlessui/react";

export const Scrim = styled(DialogBackdrop)`
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
`;

export const StyledDialogPanel = styled(DialogPanel)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: grid;
  grid-row-gap: ${({ theme }) => theme.spacing.xl}px;

  width: 320px;
  padding: ${({ theme }) => theme.spacing.l}px;
  border-radius: ${({ theme }) => theme.spacing.l}px;
  background-color: ${({ theme }) => theme.colors.white};

  box-shadow:
    rgba(17, 17, 26, 0.1) 0px 4px 16px,
    rgba(17, 17, 26, 0.1) 0px 8px 24px,
    rgba(17, 17, 26, 0.1) 0px 16px 56px;

  @media (max-width: 704px) {
    width: ${({ theme }) => `calc(100% - ${theme.spacing.xl * 2}px)`};
  }
`;
