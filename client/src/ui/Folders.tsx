import { useContext } from "react";
import { Link, useLocation, useSearchParams } from "react-router";

import styled, { css } from "styled-components";
import { MdDriveFileRenameOutline, MdPersonAddAlt1 } from "react-icons/md";
import { RiDeleteBin2Line } from "react-icons/ri";
import { IoMdLink } from "react-icons/io";

import Spinner from "./Spinner";
import Modal from "./Modal";
import Menus from "./Menus";

import { FoldersContext } from "../contexts/foldersContext";
import { AuthContext } from "../contexts/authContext";

import { Folder, UserWithShareInfo } from "../types/models";

import useRenameFolder from "../hooks/useRenameFolder";
import useDeleteFolder from "../hooks/useDeleteFolder";
import useShareFolder from "../hooks/useShareFolder";
import useHandleDrop from "../hooks/useHandleDrop";
import useCopyFolderLink from "../hooks/useCopyFolderLink";
import useUpdateShareFolder from "../hooks/useUpdateShareFolder";

import ConfirmDelete from "./Modals/ConfirmDelete";
import RenameFolderForm from "./Modals/RenameFolderForm";
import ManageShare from "./Modals/ManageShare";
import ShareFolder, { Data as ShareFolderData } from "./Modals/ShareFolder";

import { formatString } from "../utils/formatString";
import { isExpired } from "../utils/dateCompare";

const StyledFolder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const Img = styled.img<{
  $isDragOver?: boolean | null;
  $isDraggable?: boolean;
}>`
  height: 8rem;
  width: auto;
  cursor: pointer;
  transition: all 0.3s;

  ${(props) =>
    props.$isDragOver &&
    css`
      border: 2px solid var(--color-green-700);
      border-radius: 8px;
      background-color: rgba(0, 128, 0, 0.1);
      transform: scale(1.1);
    `}
`;

const Details = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
`;

const CheckBox = styled.input`
  position: absolute;
  left: 1px;
  width: 20px;
  height: 20px;
  -webkit-appearance: none;
  appearance: none;
  border: 2px solid #c8ccd4;
  border-radius: 3px;
  background-color: #fff;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;

  &:checked {
    border-color: transparent;
    background: #6871f1;
    animation: jelly 0.6s ease;
  }

  &:checked::after {
    content: "";
    position: absolute;
    top: 2px;
    left: 6px;
    width: 5px;
    height: 10px;
    border-right: 2px solid #fff;
    border-bottom: 2px solid #fff;
    transform: rotate(45deg) scale(1);
    opacity: 1;
    transition: all 0.3s ease;
  }

  &:hover {
    border-color: #777;
  }

  @keyframes jelly {
    0% {
      transform: scale(1, 1);
    }
    30% {
      transform: scale(1.25, 0.75);
    }
    40% {
      transform: scale(0.75, 1.25);
    }
    50% {
      transform: scale(1.15, 0.85);
    }
    65% {
      transform: scale(0.95, 1.05);
    }
    75% {
      transform: scale(1.05, 0.95);
    }
    100% {
      transform: scale(1, 1);
    }
  }
`;

function Folders({
  isMultiSelect,
  selectedFolderIds,
  setSelectedFolderIds,
}: {
  isMultiSelect: boolean;
  selectedFolderIds: number[];
  setSelectedFolderIds: React.Dispatch<React.SetStateAction<number[]>>;
}) {
  const {
    auth: { user: currentUser },
  } = useContext(AuthContext);

  const { folders, setFolders, isLoading } = useContext(FoldersContext);

  const { handleDeleteFolder, isLoading: isDeletingFolder } =
    useDeleteFolder(setFolders);
  const { handleRenameFolder, isLoading: isRenamingFolder } =
    useRenameFolder(setFolders);
  const { handleShareFolder, isLoading: isSharingFolder } = useShareFolder();
  const { handleUpdateShareFolder, isLoading: isUpdatingShareFolder } =
    useUpdateShareFolder();
  const { handleCopyFolderLink } = useCopyFolderLink();
  const {
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragLeave,
    dragOverFolderId,
  } = useHandleDrop();

  const [searchParams] = useSearchParams();
  const sort = searchParams.get("sort");
  const order = searchParams.get("order");

  const location = useLocation();
  const mainRoute = location.pathname.split("/")[1];
  const isSubRoute = !!location.pathname.split("/")[2];

  let filteredFolders = !isSubRoute // Only filter if NOT in a sub-route
    ? mainRoute === "myFolders"
      ? folders?.filter((folder) => folder.userId === currentUser?.id)
      : mainRoute === "shared"
      ? folders?.filter((folder) => folder.userId !== currentUser?.id)
      : folders
    : folders;

  filteredFolders = filteredFolders?.filter((folder) =>
    folder.userId === currentUser?.id
      ? folder
      : !isExpired(folder.expireDate?.toString())
  );

  if (filteredFolders && sort) {
    filteredFolders = [...filteredFolders].sort((a, b) => {
      let comparison = 0;

      if (sort === "name") {
        comparison = a.name.localeCompare(b.name); // Alphabetical sorting
      } else if (sort === "size") {
        comparison = (a.size ?? 0) - (b.size ?? 0); // Sort by size
      } else if (sort === "date") {
        comparison =
          new Date(a.createdAt ?? 0).getTime() -
          new Date(b.createdAt ?? 0).getTime(); // Sort by date
      }

      return order === "desc" ? -comparison : comparison; // Reverse if descending
    });
  }

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      {filteredFolders?.map((folder) => (
        <StyledFolder key={folder.id}>
          {folder.userId === currentUser?.id && isMultiSelect && (
            <CheckBox
              type="checkbox"
              name="delete"
              id={folder.id.toString()}
              checked={selectedFolderIds.includes(folder.id)} // Bind directly to the state
              onChange={() => {
                // Update the state when checkbox is clicked
                setSelectedFolderIds((prevIds) =>
                  prevIds.includes(folder.id)
                    ? prevIds.filter((id) => id !== folder.id)
                    : [...prevIds, folder.id]
                );
              }}
              onClick={(e) => {
                e.stopPropagation(); // Prevent link click
              }}
            />
          )}
          <Link to={`/${mainRoute}/folder/${folder.id}`}>
            <Img
              src="/folder.svg"
              id={folder.id.toString()}
              draggable={folder.userId === currentUser?.id}
              $isDraggable={folder.userId === currentUser?.id}
              title={
                folder.userId === currentUser?.id
                  ? ""
                  : "You cannot move this folder"
              }
              onDragStart={handleDragStart}
              onDragOver={(e) => handleDragOver(e, folder.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, folder.id)}
              $isDragOver={folder.id == dragOverFolderId}
            />
          </Link>
          <Details>
            <span>{formatString(folder.name)}</span>
            <Modal>
              <Menus>
                <Menus.Menu>
                  <Menus.Toggle id={folder.id} />
                  <Menus.List id={folder.id}>
                    <Modal.Open opens="rename">
                      <Menus.Button
                        icon={<MdDriveFileRenameOutline />}
                        isFolderOwner={folder.userId === currentUser?.id}
                        accessType={folder.accessType}
                      >
                        Rename
                      </Menus.Button>
                    </Modal.Open>
                    {folder.userId === currentUser?.id && (
                      <Modal.Open opens="manage">
                        <Menus.Button
                          icon={<MdDriveFileRenameOutline />}
                          isFolderOwner={folder.userId === currentUser?.id}
                          accessType={folder.accessType}
                        >
                          Manage shared users
                        </Menus.Button>
                      </Modal.Open>
                    )}
                    <Modal.Open opens="share">
                      <Menus.Button
                        icon={<MdPersonAddAlt1 />}
                        isFolderOwner={folder.userId === currentUser?.id}
                        accessType={folder.accessType}
                      >
                        Share to a User
                      </Menus.Button>
                    </Modal.Open>

                    <Menus.Button
                      icon={<IoMdLink />}
                      isFolderOwner={folder.userId === currentUser?.id}
                      accessType={folder.accessType}
                      onClick={() => handleCopyFolderLink(folder.id)}
                    >
                      Copy Link
                    </Menus.Button>

                    <Modal.Open opens="delete">
                      <Menus.Button
                        icon={<RiDeleteBin2Line />}
                        isFolderOwner={folder.userId === currentUser?.id}
                        accessType={folder.accessType}
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
                  <Modal.Window name="manage">
                    <ManageShare
                      onConfirm={(data: Partial<UserWithShareInfo>) =>
                        handleUpdateShareFolder(data)
                      }
                      disabled={isUpdatingShareFolder}
                      folderId={folder.id}
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
