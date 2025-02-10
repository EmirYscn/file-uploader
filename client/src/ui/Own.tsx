import styled from "styled-components";

import BackButton from "./BackButton";
import Files from "./Files";
import Folders from "./Folders";

import { useOutletContext } from "react-router";

const StyledOwn = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(auto, 140px));
  gap: 3rem;
`;

function Own() {
  const { isMultiSelect, selectedIds, setSelectedIds } = useOutletContext<{
    isMultiSelect: boolean;
    selectedIds: number[];
    setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>;
  }>();

  return (
    <>
      <StyledOwn>
        <BackButton />
        <Folders />
        <Files
          isMultiSelect={isMultiSelect}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
        />
      </StyledOwn>
    </>
  );
}

export default Own;
