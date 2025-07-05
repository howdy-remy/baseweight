import React, { useState, type ReactNode } from "react";
import { Link } from "react-router";

import { useAuth } from "contexts/Authentication";
import { useGetProfileQuery } from "api/profile";
import { useGetPacksQuery } from "api/packs";

import { Avatar } from "components/Avatar";
import {
  LogoType,
  Wrapper,
  Sidebar,
  AccountInfo,
  Username,
  SidebarLink,
  SidebarLinks,
  MobileHeader,
  MobileWrapper,
  Hr,
} from "./Layout.styled";
import { TextSansBold } from "components/Typography";
import { IconButton } from "components/IconButton";

export const Layout = ({ children }: { children: ReactNode }) => {
  const { session } = useAuth();
  const { data: profile } = useGetProfileQuery(
    { userId: session?.user.id },
    {
      skip: !session,
    },
  );
  const { data: packs } = useGetPacksQuery({}, { skip: !session });

  const [showNav, setShowNav] = useState(false);
  const toggleNav = () => {
    setShowNav((prev) => !prev);
  };

  return (
    <React.Fragment>
      <MobileWrapper>
        <MobileHeader>
          <Link to="/" style={{ textDecoration: "none" }}>
            <LogoType as="h1">
              base<span>weight</span>
            </LogoType>
          </Link>

          <IconButton
            icon={showNav ? "caretup" : "menu"}
            variant="primary"
            onClick={toggleNav}
            aria-label="Toggle navigation"
          />
        </MobileHeader>

        {showNav && (
          <Sidebar>
            <SidebarLinks>
              <SidebarLink to="/">
                <TextSansBold>Packs</TextSansBold>
              </SidebarLink>
              {packs?.map((pack) => (
                <SidebarLink
                  to={`/packs/${pack.id}`}
                  key={pack.id}
                  onClick={() => setShowNav(false)}
                >
                  {pack.name}
                </SidebarLink>
              ))}
              <Hr />
              <SidebarLink to="/gear">
                <TextSansBold>All Gear</TextSansBold>
              </SidebarLink>
            </SidebarLinks>

            <Link to="/account" style={{ textDecoration: "none" }}>
              <AccountInfo>
                <Username>{profile?.username}</Username>
                <Avatar
                  url={profile?.avatar_url || null}
                  size={40}
                  initial={
                    !!profile?.username.length ? profile.username[0] : "?"
                  }
                />
              </AccountInfo>
            </Link>
          </Sidebar>
        )}
        {children}
      </MobileWrapper>

      <Wrapper>
        <Sidebar>
          <Link to="/" style={{ textDecoration: "none" }}>
            <LogoType as="h1">
              base<span>weight</span>
            </LogoType>
          </Link>

          <SidebarLinks>
            <SidebarLink to="/">
              <TextSansBold>Packs</TextSansBold>
            </SidebarLink>
            {packs?.map((pack) => (
              <SidebarLink to={`/packs/${pack.id}`} key={pack.id}>
                {pack.name}
              </SidebarLink>
            ))}
            <Hr />
            <SidebarLink to="/gear">
              <TextSansBold>All Gear</TextSansBold>
            </SidebarLink>
          </SidebarLinks>

          <Link to="/account" style={{ textDecoration: "none" }}>
            <AccountInfo>
              <Username>{profile?.username}</Username>
              <Avatar
                url={profile?.avatar_url || null}
                size={40}
                initial={
                  !!profile?.username?.length ? profile.username[0] : "?"
                }
              />
            </AccountInfo>
          </Link>
        </Sidebar>
        {children}
      </Wrapper>
    </React.Fragment>
  );
};
