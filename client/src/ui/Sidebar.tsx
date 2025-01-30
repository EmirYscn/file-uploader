import styled, { css } from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";

// const BaseSidebar = (styled.header.withConfig({
//   shouldForwardProp: (prop) => prop !== "isdark",
// }) as typeof styled.header);

const StyledSidebar = styled.header.withConfig({
  shouldForwardProp: (prop) => prop !== "isdark",
})<{ isdark?: boolean }>`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  ${(props) =>
    props.isdark &&
    css`
      background-color: var(--color-black-100);
    `}
`;

function Sidebar({ isDark }: { isDark?: boolean }) {
  return (
    <StyledSidebar isdark={isDark}>
      <Logo />
      <MainNav isDark={isDark} />
    </StyledSidebar>
  );
}

export default Sidebar;
