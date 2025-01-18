import styled from "styled-components";
import BackButton from "./BackButton";
import Files from "./Files";
import Folders from "./Folders";

const StyledAll = styled.div`
  display: grid;
  grid-template-columns: repeat(8, minmax(auto, 100px));
  gap: 3rem;
`;

function All() {
  return (
    <StyledAll>
      <BackButton />
      <Folders />
      <Files />
    </StyledAll>
  );
}

export default All;
