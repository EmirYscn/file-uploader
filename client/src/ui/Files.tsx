import { useContext } from "react";
import { Link, useLocation, useSearchParams } from "react-router";
import styled from "styled-components";
import { RiDeleteBin2Line } from "react-icons/ri";
import { AiOutlineDownload } from "react-icons/ai";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { IoMdLink } from "react-icons/io";

import Modal from "./Modal";
import Menus from "./Menus";
import Spinner from "./Spinner";
import FileInfo from "./FileInfo";

import ConfirmDelete from "./Modals/ConfirmDelete";
import RenameFileForm from "./Modals/RenameFileForm";

import useDeleteFile from "../hooks/useDeleteFile";
import useRenameFile from "../hooks/useRenameFile";
import useDownloadFile from "../hooks/useDownloadFile";
import useCopyFileLink from "../hooks/useCopyFileLink";

import { FilesContext } from "../contexts/filesContext";
import { AuthContext } from "../contexts/authContext";

import { FileWithUserInfo as FileType } from "../types/models";

import { formatString } from "../utils/formatString";
import { AccessType } from "shared-types";

const File = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
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

function Files({
  isMultiSelect,
  selectedFileIds,
  setSelectedFileIds,
}: {
  isMultiSelect: boolean;
  selectedFileIds: number[];
  setSelectedFileIds: React.Dispatch<React.SetStateAction<number[]>>;
}) {
  const {
    files,
    setFiles,
    isLoading: isFilesLoading,
  } = useContext(FilesContext);

  const {
    auth: { user: currentUser },
  } = useContext(AuthContext);

  const { handleDeleteFile, isLoading: isDeletingFile } =
    useDeleteFile(setFiles);
  const { handleRenameFile, isLoading: isRenaming } = useRenameFile(setFiles);
  const { handleDownloadFile } = useDownloadFile();
  const { handleCopyFileLink } = useCopyFileLink();

  function handleDragStart(
    e: React.DragEvent<HTMLImageElement>,
    parentId: number | null
  ) {
    const target = e.currentTarget;

    if (!target.id) return;

    e.dataTransfer.setData("type", "file");
    e.dataTransfer.setData("fileId", target.id);
    if (parentId) {
      e.dataTransfer.setData("parentId", parentId.toString());
    }

    e.dataTransfer.effectAllowed = "move";
  }

  const [searchParams] = useSearchParams();
  const sort = searchParams.get("sort");
  const order = searchParams.get("order");

  const location = useLocation();
  const mainRoute = location.pathname.split("/")[1];
  const isSubRoute = !!location.pathname.split("/")[2];

  let filteredFiles = !isSubRoute
    ? mainRoute === "myFolders"
      ? files?.filter((file) => file.userId === currentUser?.id)
      : mainRoute === "shared"
      ? files?.filter((file) => file.userId !== currentUser?.id)
      : files
    : files;

  if (filteredFiles && sort) {
    filteredFiles = [...filteredFiles].sort((a, b) => {
      let comparison = 0;

      if (sort === "name") {
        comparison = a.name.localeCompare(b.name); // Alphabetical sorting
      } else if (sort === "size") {
        comparison = (a.size ?? 0) - (b.size ?? 0); // Sort by size
      } else if (sort === "date") {
        comparison =
          new Date(a.uploadDate ?? 0).getTime() -
          new Date(b.uploadDate ?? 0).getTime(); // Sort by date
      }

      return order === "desc" ? -comparison : comparison; // Reverse if descending
    });
  }

  return (
    <>
      {isFilesLoading ? (
        <Spinner />
      ) : (
        <>
          {filteredFiles?.map((file) => (
            <File key={file.id} draggable={true}>
              {isMultiSelect && (
                <CheckBox
                  type="checkbox"
                  name="delete"
                  id={file.id.toString()}
                  checked={selectedFileIds.includes(file.id)} // Bind directly to the state
                  onChange={() => {
                    // Update the state when checkbox is clicked
                    setSelectedFileIds((prevIds) =>
                      prevIds.includes(file.id)
                        ? prevIds.filter((id) => id !== file.id)
                        : [...prevIds, file.id]
                    );
                  }}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent link click
                  }}
                />
              )}
              <Link to={`file/${file.id}`}>
                <Img
                  src="/file.svg"
                  id={file.id.toString()}
                  draggable={file.userId === currentUser?.id}
                  onDragStart={(e) => handleDragStart(e, file.folderId)}
                />
                <FileInfo file={file} />
              </Link>
              <Details>
                <span>{formatString(file.name)}</span>
                <Modal>
                  <Menus>
                    <Menus.Menu>
                      <Menus.Toggle id={file.id} />
                      <Menus.List id={file.id}>
                        <Menus.Button
                          icon={<AiOutlineDownload />}
                          onClick={() => handleDownloadFile(file.id, file.name)}
                          isFolderOwner={file.userId === currentUser?.id}
                          accessType={AccessType.FULL}
                        >
                          Download
                        </Menus.Button>
                        <Modal.Open opens="rename">
                          <Menus.Button
                            icon={<MdDriveFileRenameOutline />}
                            isFolderOwner={file.userId === currentUser?.id}
                          >
                            Rename
                          </Menus.Button>
                        </Modal.Open>
                        <Menus.Button
                          icon={<IoMdLink />}
                          isFolderOwner={file.userId === currentUser?.id}
                          onClick={() => handleCopyFileLink(file.id)}
                        >
                          Copy Link
                        </Menus.Button>
                        <Modal.Open opens="delete">
                          <Menus.Button
                            icon={<RiDeleteBin2Line />}
                            isFolderOwner={file.userId === currentUser?.id}
                          >
                            Delete
                          </Menus.Button>
                        </Modal.Open>
                      </Menus.List>

                      <Modal.Window name="rename">
                        <RenameFileForm
                          resourceName={file.name}
                          disabled={isRenaming}
                          onConfirm={(data: FileType) =>
                            handleRenameFile(file.id, data)
                          }
                        />
                      </Modal.Window>

                      <Modal.Window name="delete">
                        <ConfirmDelete
                          resourceName={file.name}
                          disabled={isDeletingFile}
                          onConfirm={() => handleDeleteFile(file.id)}
                        />
                      </Modal.Window>
                    </Menus.Menu>
                  </Menus>
                </Modal>
              </Details>
            </File>
          ))}
        </>
      )}
    </>
  );
}

export default Files;
