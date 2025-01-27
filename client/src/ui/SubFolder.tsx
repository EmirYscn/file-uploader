import styled from "styled-components";
import BackButton from "./BackButton";
import Files from "./Files";
import OwnFolders from "./OwnFolders";
import SharedFolders from "./SharedFolders";
import { useLocation } from "react-router";

const StyledSubFolder = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(auto, 140px));
  gap: 3rem;
`;

function SubFolder() {
  const location = useLocation();
  console.log(location.pathname.split("/"));

  console.log(location.pathname.split("/")[3]);

  const isInShared = location.pathname.split("/")[3] === "shared";
  // const { folderId } = useParams();
  return (
    <StyledSubFolder>
      <BackButton />
      <OwnFolders />
      {/* {!isInShared ? <OwnFolders /> : <SharedFolders />} */}
      <Files />
    </StyledSubFolder>
  );
}

export default SubFolder;
