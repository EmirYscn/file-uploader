import styled from "styled-components";

import BackButton from "./BackButton";
import Files from "./Files";
import Folders from "./Folders";

const StyledShared = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(auto, 140px));
  gap: 3rem;
`;

function Shared() {
  return (
    <StyledShared>
      <BackButton />
      <Folders />
      <Files />
    </StyledShared>
  );
}

export default Shared;
