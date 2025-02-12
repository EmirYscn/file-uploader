import styled from "styled-components";

import BackButton from "./BackButton";
import Files from "./Files";
import Folders from "./Folders";

import { useOutletContext } from "react-router";

const StyledShared = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(auto, 140px));
  gap: 3rem;
`;

function Shared() {
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
      <StyledShared>
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
      </StyledShared>
    </>
  );
}

export default Shared;
