import { useContext } from "react";
import { Outlet } from "react-router";
import styled, { css } from "styled-components";

import Header from "./Header";
import Sidebar from "./Sidebar";

import { UserContext } from "../contexts/userContext";
import { ThemeContext } from "../contexts/themeContext";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 40rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main.withConfig({
  shouldForwardProp: (prop) => prop !== "isdark",
})<{ isdark: boolean }>`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;

  ${(props) =>
    props.isdark &&
    css`
      background-color: var(--color-black-200);
      color: var(--color-grey-200);
    `}
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  position: relative;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  align-self: flex-end;

  & button {
    padding: 0.5rem 1rem;
    /* background-color: var(--color-primary-400); */
    /* color: var(--color-grey-100); */
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
  }
`;

function AppLayout() {
  const { isDark } = useContext(ThemeContext);

  return (
    <StyledAppLayout>
      <Header isDark={isDark} />
      <Sidebar isDark={isDark} />
      <Main isdark={isDark}>
        <Container>
          <ButtonContainer>
            <button>Sort</button>
            <button>Filter</button>
          </ButtonContainer>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
