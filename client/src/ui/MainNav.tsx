import { FaHome } from "react-icons/fa";
import { RiFolderCloudLine } from "react-icons/ri";
import { NavLink } from "react-router";
import styled, { css } from "styled-components";
import NewButton from "./NewButton";
import { PiFolderSimpleUserBold } from "react-icons/pi";

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
    font-size: 2.3rem;
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
      /* &:link,
      &:visited {
        color: white;
      } */
    `}
`;

function MainNav({ isDark }: { isDark?: boolean }) {
  return (
    <>
      <NewButton />
      <nav>
        <NavList>
          <li>
            <StyledNavLink to="all" isdark={isDark}>
              <FaHome />
              <span>Home</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="myFolders" isdark={isDark}>
              <PiFolderSimpleUserBold />
              <span>My Drive</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="shared" isdark={isDark}>
              <RiFolderCloudLine />
              <span>Shared with me</span>
            </StyledNavLink>
          </li>
        </NavList>
      </nav>
    </>
  );
}

export default MainNav;
