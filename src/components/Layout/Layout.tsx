import { Fragment, type ReactNode } from "react";
import { Link } from "react-router";

import { useAuth } from "contexts/Authentication";
import { useGetProfileQuery } from "api/profile";

import Avatar from "../Avatar/Avatar";
import {
  LogoType,
  Wrapper,
  Sidebar,
  AccountInfo,
  Username,
  SidebarLink,
  SidebarLinks,
} from "./Layout.styled";
import { useGetPacksQuery } from "api/packs";
import { TextSansBold } from "components/Typography";

export const Layout = ({ children }: { children: ReactNode }) => {
  const { session } = useAuth();
  const { data: profile } = useGetProfileQuery({ userId: session?.user.id });
  const { data: packs, isLoading } = useGetPacksQuery({
    userId: session?.user.id,
  });
  return (
    <Wrapper>
      <Sidebar>
        <Link to="/" style={{ textDecoration: "none" }}>
          <LogoType as="h1">
            base<span>weight</span>
          </LogoType>
        </Link>

        <SidebarLinks>
          <SidebarLink to="/">
            <TextSansBold>All Gear</TextSansBold>
          </SidebarLink>
          <SidebarLink to="/">
            <TextSansBold>Packs</TextSansBold>
          </SidebarLink>
          {packs?.map((pack) => (
            <Fragment key={pack.id}>
              <SidebarLink to={`/packs/${pack.id}`}>{pack.name}</SidebarLink>
            </Fragment>
          ))}
        </SidebarLinks>

        <Link to="/account" style={{ textDecoration: "none" }}>
          <AccountInfo>
            <Username>{profile?.username}</Username>
            <Avatar url={profile?.avatar_url || null} size={40} />
          </AccountInfo>
        </Link>
      </Sidebar>
      {children}
    </Wrapper>
  );
};
