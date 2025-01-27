import styled from "styled-components";
import BackButton from "./BackButton";
import Files from "./Files";
import OwnFolders from "./OwnFolders";
import SharedFolders from "./SharedFolders";

const StyledAll = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(auto, 140px));
  gap: 3rem;
`;

function All() {
  return (
    <StyledAll>
      <BackButton />
      <OwnFolders />
      <SharedFolders />
      <Files />
    </StyledAll>
  );
}

export default All;
