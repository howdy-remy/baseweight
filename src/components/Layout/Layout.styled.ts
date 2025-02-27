import styled from "styled-components";
import { HeadingOne, TextSansRegular } from "components/Typography";
import { Link } from "react-router";

// layout
export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 296px 1fr;
  /* column-gap: 24px; */
  width: 100%;
`;

export const Sidebar = styled.div`
  position: sticky;
  top: 0;

  height: 100vh;
  width: 296px;
  padding: ${({ theme }) => theme.spacing.l}px;
  background-color: ${({ theme }) => theme.colors.flour};
`;

export const SidebarLinks = styled.div`
  margin-top: ${({ theme }) => theme.spacing.l}px;
`;

// bits
export const LogoType = styled(HeadingOne)`
  color: ${({ theme }) => theme.colors.moss};
  margin: 0;
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

export const AccountInfo = styled.div`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.l}px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.m}px;

  width: ${({ theme }) => `calc(100% - ${theme.spacing.l * 2}px)`};
  height: 40px;
`;

export const Username = styled(TextSansRegular)`
  color: ${({ theme }) => theme.colors.black};
  &:hover {
    color: ${({ theme }) => theme.colors.moss};
  }
`;
