import { useLocation } from "react-router";
import styled from "styled-components";

import BackButton from "./BackButton";
import SharedFolders from "./SharedFolders";
import SharedFiles from "./SharedFiles";

const StyledShared = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(auto, 140px));
  gap: 3rem;
`;

function SharedLink() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  pathSegments.shift();
  const isSubFolder = pathSegments.length > 2;
  return (
    <StyledShared>
      {isSubFolder && <BackButton />}
      <SharedFolders />
      <SharedFiles />
    </StyledShared>
  );
}

export default SharedLink;
