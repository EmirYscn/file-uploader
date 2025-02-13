import { useContext, useState } from "react";
import { Outlet } from "react-router";
import styled, { css } from "styled-components";

import Header from "./Header";
import Sidebar from "./Sidebar";

import { ThemeContext } from "../contexts/themeContext";

import ActionNav from "./ActionNav";

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

function AppLayout() {
  const { isDark } = useContext(ThemeContext);

  const [isMultiSelect, setIsMultiSelect] = useState(false);
  const [selectedFileIds, setSelectedFileIds] = useState<number[]>([]);
  const [selectedFolderIds, setSelectedFolderIds] = useState<number[]>([]);

  return (
    <StyledAppLayout>
      <Header isDark={isDark} />
      <Sidebar isDark={isDark} />
      <Main isdark={isDark}>
        <ActionNav
          isMultiSelect={isMultiSelect}
          setIsMultiSelect={setIsMultiSelect}
          selectedFileIds={selectedFileIds}
          setSelectedFileIds={setSelectedFileIds}
          selectedFolderIds={selectedFolderIds}
          setSelectedFolderIds={setSelectedFolderIds}
        />
        <Container>
          <Outlet
            context={{
              isMultiSelect,
              selectedFileIds,
              setSelectedFileIds,
              selectedFolderIds,
              setSelectedFolderIds,
            }}
          />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
