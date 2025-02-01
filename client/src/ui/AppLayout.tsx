import { Outlet } from "react-router";
import styled, { css } from "styled-components";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { UserContext } from "../contexts/userContext";
import { useContext } from "react";
import { ThemeContext } from "../contexts/themeContext";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

const Main = styled.main.withConfig({
  shouldForwardProp: (prop) => prop !== "isdark",
})<{ isdark: boolean }>`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;
  /* position: relative; */

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

function AppLayout() {
  const { user } = useContext(UserContext);
  const { isDark } = useContext(ThemeContext);
  return (
    <StyledAppLayout>
      <Header isDark={isDark} />
      <Sidebar isDark={isDark} />
      <Main isdark={isDark}>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
