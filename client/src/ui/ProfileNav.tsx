import { NavLink } from "react-router";
import { FaHome, FaLock, FaRegUser } from "react-icons/fa";
import { PiFolderSimpleUserBold } from "react-icons/pi";
import styled, { css } from "styled-components";
import { RiFolderCloudLine } from "react-icons/ri";

import NewButton from "./NewButton";
import { IoSettingsOutline } from "react-icons/io5";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink).withConfig({
  shouldForwardProp: (prop) => prop !== "isdark",
})<{ isdark?: boolean }>`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    font-size: 1.5rem;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }

  ${(props) =>
    props.isdark &&
    css`
      &:hover,
      &:active,
      &.active:link,
      &.active:visited {
        background-color: var(--color-black-400);
        border-bottom: 1px solid var(--color-black-500);
        color: white;
      }
    `}
`;

function ProfileNav({ isDark }: { isDark?: boolean }) {
  return (
    <>
      <nav>
        <NavList>
          <li>
            <StyledNavLink to="/profile" isdark={isDark} end>
              <FaRegUser />
              <span>Profile</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/profile/password" isdark={isDark}>
              <FaLock />
              <span>Change Password</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="profile/settings" isdark={isDark}>
              <IoSettingsOutline />
              <span>Settings</span>
            </StyledNavLink>
          </li>
        </NavList>
      </nav>
    </>
  );
}

export default ProfileNav;
