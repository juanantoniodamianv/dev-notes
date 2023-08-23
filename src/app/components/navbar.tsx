"use client";

import {
  Navbar as NavbarComponent,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";

import { AuthButton } from "./auth-button-client";
import { Session } from "@supabase/supabase-js";

export default function Navbar({
  userAvatarUrl,
  userName,
  userFullName,
  session,
}: {
  userAvatarUrl: string;
  userName: string;
  userFullName: string;
  session: Session | null;
}) {
  return (
    <NavbarComponent>
      <NavbarBrand>
        <p className="font-bold text-inherit">DN</p>
      </NavbarBrand>

      {session === null ? (
        <AuthButton session={session} />
      ) : (
        <>
          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarItem>
              <Link color="foreground" href="#">
                Trending
              </Link>
            </NavbarItem>
            <NavbarItem isActive>
              <Link href="#" aria-current="page" color="secondary">
                Following
              </Link>
            </NavbarItem>
          </NavbarContent>

          <NavbarContent as="div" justify="end">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name={userFullName}
                  size="sm"
                  src={userAvatarUrl}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{userName}</p>
                </DropdownItem>
                <DropdownItem key="settings">My Settings</DropdownItem>
                <DropdownItem key="logout" color="danger">
                  <AuthButton session={session} />
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>
        </>
      )}
    </NavbarComponent>
  );
}
