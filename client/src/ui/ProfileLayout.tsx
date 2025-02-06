import { useContext } from "react";
import { Outlet } from "react-router";
import styled, { css } from "styled-components";

import Header from "./Header";
import Sidebar from "./Sidebar";

import { UserContext } from "../contexts/userContext";
import { ThemeContext } from "../contexts/themeContext";
import ProfileSidebar from "./ProfileSidebar";
import ProfileHeader from "./ProfileHeader";
import BackButton from "./BackButton";

const StyledProfileLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
  justify-content: center;
  position: relative;
`;

const Main = styled.main.withConfig({
  shouldForwardProp: (prop) => prop !== "isdark",
})<{ isdark: boolean }>`
  background-color: var(--color-grey-100);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* height: 100vh; */

  ${(props) =>
    props.isdark &&
    css`
      background-color: var(--color-black-200);
      color: var(--color-grey-200);
    `}
`;

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  position: relative;
`;

function ProfileLayout() {
  const { isDark } = useContext(ThemeContext);

  return (
    <StyledProfileLayout>
      <ProfileHeader isDark={isDark} />
      <ProfileSidebar isDark={isDark} />
      <Main isdark={isDark}>
        <Container>
          <BackButton to={"/"} />
          <Outlet />
        </Container>
      </Main>
    </StyledProfileLayout>
  );
}

export default ProfileLayout;
