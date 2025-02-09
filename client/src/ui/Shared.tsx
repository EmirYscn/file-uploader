import styled from "styled-components";

import BackButton from "./BackButton";
import Files from "./Files";
import Folders from "./Folders";
import Sort from "./Sort";

const StyledShared = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(auto, 140px));
  gap: 3rem;
`;

function Shared() {
  return (
    <>
      <Sort />
      <StyledShared>
        <BackButton />
        <Folders />
        <Files />
      </StyledShared>
    </>
  );
}

export default Shared;
