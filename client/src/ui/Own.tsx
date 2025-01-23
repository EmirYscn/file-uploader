import styled from "styled-components";
import BackButton from "./BackButton";
import Files from "./Files";
import Folders from "./Folders";

const StyledOwn = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(auto, 140px));
  gap: 3rem;
`;

function Own() {
  return (
    <StyledOwn>
      <BackButton />
      <Folders />
      <Files />
    </StyledOwn>
  );
}

export default Own;
