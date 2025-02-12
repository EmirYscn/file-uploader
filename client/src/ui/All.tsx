import styled from "styled-components";

import BackButton from "./BackButton";
import Files from "./Files";
import Folders from "./Folders";

import { useOutletContext } from "react-router";

const StyledAll = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(auto, 140px));
  gap: 3rem;
`;

function All() {
  const {
    isMultiSelect,
    selectedFileIds,
    setSelectedFileIds,
    selectedFolderIds,
    setSelectedFolderIds,
  } = useOutletContext<{
    isMultiSelect: boolean;
    selectedFileIds: number[];
    setSelectedFileIds: React.Dispatch<React.SetStateAction<number[]>>;
    selectedFolderIds: number[];
    setSelectedFolderIds: React.Dispatch<React.SetStateAction<number[]>>;
  }>();

  return (
    <>
      <StyledAll>
        <BackButton />
        <Folders
          isMultiSelect={isMultiSelect}
          selectedFolderIds={selectedFolderIds}
          setSelectedFolderIds={setSelectedFolderIds}
        />
        <Files
          isMultiSelect={isMultiSelect}
          selectedFileIds={selectedFileIds}
          setSelectedFileIds={setSelectedFileIds}
        />
      </StyledAll>
    </>
  );
}

export default All;
