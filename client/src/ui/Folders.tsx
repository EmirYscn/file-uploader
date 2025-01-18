import { Link, useLocation } from "react-router";
import styled from "styled-components";
import { MdDriveFileRenameOutline, MdPersonAddAlt1 } from "react-icons/md";
import { RiDeleteBin2Line } from "react-icons/ri";

import Spinner from "./Spinner";
import Modal from "./Modal";
import Menus from "./Menus";
import ConfirmDelete from "./ConfirmDelete";
import useDeleteFolder from "../hooks/useDeleteFolder";
import { useContext } from "react";
import { FoldersContext } from "../contexts/foldersContext";
import useRenameFolder from "../hooks/useRenameFolder";
import { Folder } from "../types/models";
import RenameFileForm from "./RenameFileForm";
import RenameFolderForm from "./RenameFolderForm";

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

function Folders() {
  const { folders, setFolders, isLoading } = useContext(FoldersContext);
  const { handleDeleteFolder, isLoading: isDeletingFolder } =
    useDeleteFolder(setFolders);
  const { handleRenameFolder, isLoading: isRenamingFolder } =
    useRenameFolder(setFolders);
  const location = useLocation();
  const mainRoute = location.pathname.split("/")[1];

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      {folders?.map((folder) => (
        <StyledFolder key={folder.id}>
          <Link to={`/${mainRoute}/folder/${folder.id}`}>
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
                      disabled={isDeletingFolder}
                      onConfirm={() => handleDeleteFolder(folder.id)}
                    />
                  </Modal.Window>
                  <Modal.Window name="rename">
                    <RenameFolderForm
                      resourceName={folder.name}
                      disabled={isRenamingFolder}
                      onConfirm={(data: Folder) =>
                        handleRenameFolder(folder.id, data)
                      }
                    />
                  </Modal.Window>
                </Menus.Menu>
              </Menus>
            </Modal>
          </Details>
        </StyledFolder>
      ))}
    </>
  );
}

export default Folders;
