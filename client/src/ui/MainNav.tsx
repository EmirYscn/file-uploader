import { FaHome } from "react-icons/fa";
import { RiFolderCloudLine } from "react-icons/ri";
import { NavLink } from "react-router";
import styled from "styled-components";
import NewButton from "./NewButton";
import {
  PiFolderSimpleUserBold,
  PiFolderSimpleUserDuotone,
} from "react-icons/pi";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
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
    font-size: 2.3rem;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

function MainNav() {
  return (
    <>
      <NewButton />
      <nav>
        <NavList>
          <li>
            <StyledNavLink to="all">
              <FaHome />
              <span>All</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="myFolders">
              <PiFolderSimpleUserBold />
              <span>My Folders / Files</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="shared">
              <RiFolderCloudLine />
              <span>Shared to Me</span>
            </StyledNavLink>
          </li>
        </NavList>
      </nav>
    </>
  );
}

export default MainNav;
