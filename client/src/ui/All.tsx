import styled from "styled-components";

import BackButton from "./BackButton";
import Files from "./Files";
import Folders from "./Folders";

const StyledAll = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(auto, 140px));
  gap: 3rem;
`;
const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

function All() {
  return (
    <>
      {/* <ButtonContainer>
        <button>Sort</button>
        <button>Filter</button>
      </ButtonContainer> */}
      <StyledAll>
        <BackButton />

        <Folders />
        <Files />
      </StyledAll>
    </>
  );
}

export default All;
