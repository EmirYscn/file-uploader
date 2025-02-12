import { useContext } from "react";
import { Outlet } from "react-router";
import styled, { css } from "styled-components";

import ProfileSidebar from "./ProfileSidebar";
import ProfileHeader from "./ProfileHeader";
import BackButton from "./BackButton";

import { ThemeContext } from "../contexts/themeContext";

const StyledProfileLayout = styled.div<{ isdark?: boolean }>`
  display: flex;
  flex-direction: column;
  height: 100vh;

  ${(props) =>
    props.isdark &&
    css`
      background-color: var(--color-black-200);
      color: var(--color-grey-200);
    `}
`;

const ProfileContainer = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  justify-content: center;
  position: relative;
  width: 80%;
  margin: 5rem 15rem;
  height: 100vh;
  box-shadow: var(--shadow-lg);
  background: var(--color-grey-50);
  border-radius: var(--border-radius-md);

  @media (max-width: 1024px) {
    grid-template-columns: 20rem 1fr;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
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
    <StyledProfileLayout isdark={isDark}>
      <ProfileHeader isDark={isDark} />
      <ProfileContainer>
        <ProfileSidebar isDark={isDark} />
        <Main isdark={isDark}>
          <Container>
            <BackButton to={"/all"} />
            <Outlet />
          </Container>
        </Main>
      </ProfileContainer>
    </StyledProfileLayout>
  );
}

export default ProfileLayout;
