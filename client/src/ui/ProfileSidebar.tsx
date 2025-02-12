import styled, { css } from "styled-components";

import ProfileNav from "./ProfileNav";

const StyledSidebar = styled.header.withConfig({
  shouldForwardProp: (prop) => prop !== "isdark",
})<{ isdark?: boolean }>`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.isdark &&
    css`
      background-color: var(--color-black-100);
    `}
`;

function ProfileSidebar({ isDark }: { isDark?: boolean }) {
  return (
    <StyledSidebar isdark={isDark}>
      <ProfileNav isDark={isDark} />
    </StyledSidebar>
  );
}

export default ProfileSidebar;
