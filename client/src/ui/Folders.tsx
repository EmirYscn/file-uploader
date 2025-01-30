import { useContext } from "react";
import { Link, useLocation } from "react-router";
import { Folder } from "../types/models";

import styled from "styled-components";
import { MdDriveFileRenameOutline, MdPersonAddAlt1 } from "react-icons/md";
import { RiDeleteBin2Line } from "react-icons/ri";
import { IoMdLink } from "react-icons/io";

import Spinner from "./Spinner";
import Modal from "./Modal";
import Menus from "./Menus";

import { UserContext } from "../contexts/userContext";
import { FoldersContext } from "../contexts/foldersContext";

import useRenameFolder from "../hooks/useRenameFolder";
import useDeleteFolder from "../hooks/useDeleteFolder";
import ConfirmDelete from "./ConfirmDelete";
import RenameFolderForm from "./RenameFolderForm";
import useShareFolder from "../hooks/useShareFolder";
import ShareFolder, { Data as ShareFolderData } from "./ShareFolder";

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
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
`;

function Folders() {
  const { user: currentUser } = useContext(UserContext);
  const { folders, setFolders, isLoading } = useContext(FoldersContext);

  const { handleDeleteFolder, isLoading: isDeletingFolder } =
    useDeleteFolder(setFolders);
  const { handleRenameFolder, isLoading: isRenamingFolder } =
    useRenameFolder(setFolders);
  const { handleShareFolder, isLoading: isSharingFolder } = useShareFolder();

  const location = useLocation();
  const mainRoute = location.pathname.split("/")[1];

  const filteredFolders =
    mainRoute === "myFolders"
      ? folders?.filter((folder) => folder.userId === currentUser?.id)
      : mainRoute === "shared"
      ? folders?.filter((folder) => folder.userId !== currentUser?.id)
      : folders;

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      {filteredFolders?.map((folder) => (
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
                      <Menus.Button
                        icon={<MdDriveFileRenameOutline />}
                        isFolderOwner={folder.userId === currentUser?.id}
                        disabled={folder.isAccessLimited}
                      >
                        Rename
                      </Menus.Button>
                    </Modal.Open>
                    <Modal.Open opens="share">
                      <Menus.Button
                        icon={<MdPersonAddAlt1 />}
                        isFolderOwner={folder.userId === currentUser?.id}
                        disabled={folder.isAccessLimited}
                      >
                        Share to a User
                      </Menus.Button>
                    </Modal.Open>

                    <Menus.Button
                      icon={<IoMdLink />}
                      isFolderOwner={folder.userId === currentUser?.id}
                      disabled={folder.isAccessLimited}
                    >
                      Copy Link
                    </Menus.Button>

                    <Modal.Open opens="delete">
                      <Menus.Button
                        icon={<RiDeleteBin2Line />}
                        isFolderOwner={folder.userId === currentUser?.id}
                        disabled={folder.isAccessLimited}
                      >
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
                  <Modal.Window name="share">
                    <ShareFolder
                      onConfirm={(data: ShareFolderData) =>
                        handleShareFolder(data, folder.id)
                      }
                      disabled={isSharingFolder}
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
