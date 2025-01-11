import styled from "styled-components";
import { Folder } from "../types/models";
import { SlOptionsVertical } from "react-icons/sl";
import Button from "./Button";
import { HiEllipsisVertical } from "react-icons/hi2";
import { Link } from "react-router";

const StyledFolders = styled.div`
  display: grid;
  grid-template-columns: repeat(8, minmax(auto, 100px));
`;

const StyledFolder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Img = styled.img`
  height: 8rem;
  width: auto;
  cursor: pointer;
`;
const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-grey-700);
  }
`;

type FoldersProps = {
  folders: Folder[];
};

function Folders({ folders }: FoldersProps) {
  return (
    <StyledFolders>
      {folders.map((folder) => (
        <StyledFolder key={folder.id}>
          <Link to={`/folder/${folder.id}`}>
            <Img src="/folder.svg" alt="" />
          </Link>
          <Details>
            <span>{folder.name}</span>
            <StyledToggle>
              <HiEllipsisVertical />
            </StyledToggle>
          </Details>
        </StyledFolder>
      ))}
    </StyledFolders>
  );
}

export default Folders;
