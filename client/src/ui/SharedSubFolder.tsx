import styled from "styled-components";
import BackButton from "./BackButton";
import Files from "./Files";
import Folders from "./Folders";
import { useParams } from "react-router";
import { useContext, useEffect } from "react";
import { ShareContext } from "../contexts/shareContext";

const StyledShared = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(auto, 140px));
  gap: 3rem;
`;

function SharedSubFolder() {
  return (
    <StyledShared>
      <BackButton />
      <Folders />
      <Files />
    </StyledShared>
  );
}

export default SharedSubFolder;
