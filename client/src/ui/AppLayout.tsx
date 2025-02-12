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

const ButtonContainer = styled.div`
  margin-bottom: 1rem;
  max-width: 10rem;
  justify-self: end;

  & button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    background: none;
  }
`;

const Select = styled.select<{ isdark?: boolean }>`
  appearance: none;
  background-color: #f9f9f9;
  /* border: 1px solid #ccc; */
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;
  font-family: inherit;
  color: #333;
  width: 100%;
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 4px rgba(0, 123, 255, 0.4);
  }

  /* background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24'%3E%3Cpath fill='%23666' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 12px 12px; */

  & option {
    background-color: #fff;
    color: #333;
    font-size: 16px;
    padding: 8px;
  }

  & option:disabled {
    color: #999;
  }

  & option:hover {
    background-color: #f0f8ff;
  }

  ${(props) =>
    props.isdark &&
    css`
      background-color: #333;
      color: #f9f9f9;
      /* border: 1px solid #ccc; */
      &:focus {
        border-color: #007bff;
        box-shadow: 0 0 4px rgba(0, 123, 255, 0.4);
      }
      & option {
        background-color: #333;
        color: #f9f9f9;
      }
      & option:hover {
        background-color: #f9f9f9;
      }
    `}
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
