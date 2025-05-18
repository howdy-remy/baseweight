import styled from "styled-components";

export const Toasts = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.m}px;
`;

export const Wrapper = styled.div`
  width: fit-content;
  min-width: 240px;
  padding: 16px;

  border: 1px solid ${({ theme }) => theme.colors.stone};
  border-radius: ${({ theme }) => theme.spacing.m}px;

  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  text-align: center;
  color: #494e5c;
`;

export const ToastPortal = styled.div`
  position: fixed;
  top: ${({ theme }) => theme.spacing.l}px;
  right: ${({ theme }) => theme.spacing.l}px;
  z-index: 999;
`;
