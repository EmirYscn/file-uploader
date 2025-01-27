import styled from "styled-components";
import BackButton from "./BackButton";
import Files from "./Files";

import SharedFolders from "./SharedFolders";

const StyledShared = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(auto, 140px));
  gap: 3rem;
`;

function Shared() {
  return (
    <StyledShared>
      <BackButton />
      <SharedFolders />
      <Files />
    </StyledShared>
  );
}

export default Shared;
