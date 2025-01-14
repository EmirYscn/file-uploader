import { Link } from "react-router";
import styled from "styled-components";
import { MdDriveFileRenameOutline, MdPersonAddAlt1 } from "react-icons/md";
import { RiDeleteBin2Line } from "react-icons/ri";

import { Folder } from "../types/models";
import Spinner from "./Spinner";
import Modal from "./Modal";
import Menus from "./Menus";
import ConfirmDelete from "./ConfirmDelete";
import useFolders from "../hooks/useFolders";

const StyledFolders = styled.div`
  display: grid;
  grid-template-columns: repeat(8, minmax(auto, 100px));
  gap: 3rem;
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

// type FoldersProps = {
//   folders: Folder[];
//   isLoading: boolean;
// };

function Folders() {
  const { folders, isLoading } = useFolders();
  function handleDeleteFolder(folderId: number) {
    // try {
    // } catch (error) {}
  }

  return isLoading ? (
    <Spinner />
  ) : (
    <StyledFolders>
      {folders?.map((folder) => (
        <StyledFolder key={folder.id}>
          <Link to={`folder/${folder.id}`}>
            <Img src="/folder.svg" alt="" />
          </Link>
          <Details>
            <span>{folder.name}</span>
            <Modal>
              <Menus>
                <Menus.Menu>
                  <Menus.Toggle id={folder.id} />
                  <Menus.List id={folder.id}>
                    <Modal.Open opens="rename">
                      <Menus.Button icon={<MdDriveFileRenameOutline />}>
                        Rename
                      </Menus.Button>
                    </Modal.Open>
                    <Modal.Open opens="share">
                      <Menus.Button icon={<MdPersonAddAlt1 />}>
                        Share
                      </Menus.Button>
                    </Modal.Open>
                    <Modal.Open opens="delete">
                      <Menus.Button icon={<RiDeleteBin2Line />}>
                        Delete
                      </Menus.Button>
                    </Modal.Open>
                  </Menus.List>
                  <Modal.Window name="delete">
                    <ConfirmDelete
                      resourceName={folder.name}
                      // disabled={isDeleting}
                      onConfirm={() => handleDeleteFolder(folder.id)}
                    />
                  </Modal.Window>
                </Menus.Menu>
              </Menus>
            </Modal>
          </Details>
        </StyledFolder>
      ))}
    </StyledFolders>
  );
}

export default Folders;
