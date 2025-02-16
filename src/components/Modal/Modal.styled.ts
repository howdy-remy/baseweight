import styled from "styled-components";
import { DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";

export const Scrim = styled(DialogBackdrop)`
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const StyledDialogPanel = styled(DialogPanel)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 400px;
  padding: ${({ theme }) => theme.spacing.m}px;
  border-radius: ${({ theme }) => theme.spacing.s}px;
  background-color: ${({ theme }) => theme.colors.white};

  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

export const StyledDialogTitle = styled(DialogTitle)`
  font-family: "ForrestBold", serif;
  font-size: ${({ theme }) => theme.fontsizes.l};
  line-height: 1.4;
  margin: 0;
`;

export const ActionsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.s}px;
  margin-top: ${({ theme }) => theme.spacing.m}px;
`;
