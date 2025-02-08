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

const StyledProfileLayout = styled.div<{ isdark?: boolean }>`
  display: flex;
  flex-direction: column;
  /* display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  justify-content: center;
  position: relative; */
  height: 100vh;

  ${(props) =>
    props.isdark &&
    css`
      background-color: var(--color-black-200);
      color: var(--color-grey-200);
    `}
`;

// const ProfileContainer = styled.div`
//   display: grid;
//   grid-template-columns: 26rem 1fr;
//   justify-content: center;
//   position: relative;
//   max-width: 1200px; /* Prevents layout from being too wide */
//   margin: 5rem 15em;
//   height: 100vh;
//   box-shadow: var(--shadow-lg);
// `;

const ProfileContainer = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  justify-content: center;
  position: relative;
  width: 80%;
  margin: 5rem 15rem; /* Centers the container with dynamic spacing */
  height: 100vh;
  box-shadow: var(--shadow-lg);
  background: var(--color-grey-50);
  border-radius: var(--border-radius-md);

  @media (max-width: 1024px) {
    grid-template-columns: 20rem 1fr; /* Shrink sidebar on medium screens */
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Stack sidebar and main content */
    height: auto;
  }
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
  /* height: auto; */
  /* box-shadow: var(--shadow-lg); */
  ${(props) =>
    props.isdark &&
    css`
      background-color: var(--color-black-200);
      color: var(--color-grey-200);
    `}
`;

// const Main = styled.main.withConfig({
//   shouldForwardProp: (prop) => prop !== "isdark",
// })<{ isdark: boolean }>`
//   background-color: var(--color-grey-100);
//   padding: 4rem 4.8rem 6.4rem;
//   overflow: auto; /* Change from scroll to auto */
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   width: 100%;

//   ${(props) =>
//     props.isdark &&
//     css`
//       background-color: var(--color-black-200);
//       color: var(--color-grey-200);
//     `}

//   @media (max-width: 768px) {
//     padding: 2rem; /* Reduce padding on mobile */
//   }
// `;

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
    <StyledProfileLayout isdark={isDark}>
      <ProfileHeader isDark={isDark} />
      <ProfileContainer>
        <ProfileSidebar isDark={isDark} />
        <Main isdark={isDark}>
          <Container>
            <BackButton to={"/"} />
            <Outlet />
          </Container>
        </Main>
      </ProfileContainer>
    </StyledProfileLayout>
  );
}

export default ProfileLayout;
