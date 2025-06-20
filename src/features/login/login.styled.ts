import { LogoType } from "components/Layout/Layout.styled";
import styled from "styled-components";

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;
  background-image: url("/topo.png");
`;

export const LoginWrapper = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.l}px;

  width: 480px;
  padding: ${({ theme }) => theme.spacing.xl}px;
  margin: ${({ theme }) => theme.spacing.xl}px;

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.spacing.m}px;

  box-shadow:
    rgba(17, 17, 26, 0.1) 0px 4px 16px,
    rgba(17, 17, 26, 0.1) 0px 8px 24px,
    rgba(17, 17, 26, 0.1) 0px 16px 56px;

  & > ${LogoType} {
    padding-left: 0;
  }
`;

export const StyledForm = styled.form`
  display: grid;
  grid-row-gap: ${({ theme }) => theme.spacing.m}px;
`;
