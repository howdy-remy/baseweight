import styled from "styled-components";
import { HeadingOne, TextSansRegular } from "components/Typography";
import { Link } from "react-router";

// layout
export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 296px 1fr;
  width: 100%;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const MobileWrapper = styled.div`
  display: none;
  grid-template-columns: 1fr;
  width: 100%;

  @media (max-width: 768px) {
    display: grid;
  }
`;

export const Sidebar = styled.div`
  position: sticky;
  top: 0px;
  z-index: 500;

  height: calc(100vh - 64px);
  width: 296px;
  padding: ${({ theme }) => theme.spacing.l}px;
  background-color: ${({ theme }) => theme.colors.flour};

  overflow: scroll;

  @media (max-width: 768px) {
    width: 100%;
    top: 64px;
  }
`;

export const SidebarLinks = styled.div`
  margin: ${({ theme: { spacing } }) => `${spacing.l}px 0 64px`};
`;

export const MobileHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;

  display: flex;
  align-items: center;
  justify-content: space-between;

  height: 64px;
  padding: ${({ theme }) => theme.spacing.l}px;

  background-color: ${({ theme }) => theme.colors.flour};
`;

// bits
export const LogoType = styled(HeadingOne)`
  color: ${({ theme }) => theme.colors.moss};
  margin: 0;
  padding-left: ${({ theme: { spacing } }) => spacing.m}px;

  line-height: 1.4;

  & > span {
    font-family: inherit;
    color: ${({ theme }) => theme.colors.lichen};
  }
`;

export const SidebarLink = styled(Link)`
  display: block;
  padding: ${({ theme: { spacing } }) => `${spacing.s}px ${spacing.m}px`};
  border-radius: ${({ theme }) => theme.spacing.s}px;

  color: ${({ theme }) => theme.colors.black};
  text-decoration: none;

  &:hover {
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

export const AccountInfo = styled.div<{ width?: number }>`
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1000;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.m}px;

  height: 64px;
  width: 296px;
  padding: ${({ theme }) => theme.spacing.l}px;

  background-color: ${({ theme }) => theme.colors.flour};

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Username = styled(TextSansRegular)`
  color: ${({ theme }) => theme.colors.black};
  &:hover {
    color: ${({ theme }) => theme.colors.moss};
  }
`;

export const SignInCta = styled.div`
  margin-top: ${({ theme }) => theme.spacing.l}px;
  margin-left: ${({ theme }) => theme.spacing.m}px;
`;

export const Hr = styled.hr`
  margin: ${({ theme }) => `${theme.spacing.m}px 0`};
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.lichen};
`;
