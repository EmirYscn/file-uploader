import styled from "styled-components";
import { RiDeleteBin2Line } from "react-icons/ri";
import { AiOutlineDownload } from "react-icons/ai";
import { MdDriveFileRenameOutline, MdPersonAddAlt1 } from "react-icons/md";

import Modal from "./Modal";
import Menus from "./Menus";
import Spinner from "./Spinner";
import BackButton from "./BackButton";

import ConfirmDelete from "./ConfirmDelete";
import RenameFileForm from "./RenameFileForm";

import useDeleteFile from "../hooks/useDeleteFile";
import { Link } from "react-router";
import { useContext } from "react";
import { FilesContext } from "../contexts/filesContext";
import useRenameFile from "../hooks/useRenameFile";
import { File as FileType } from "../types/models";
import useDownloadFile from "../hooks/useDownloadFile";
import { formatString } from "../utils/formatString";

const StyledFiles = styled.div`
  display: grid;
  grid-template-columns: repeat(8, minmax(auto, 100px));
  gap: 3rem;
`;

const File = styled.div`
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
`;

function Files() {
  const {
    files,
    setFiles,
    isLoading: isFilesLoading,
  } = useContext(FilesContext);

  const { handleDeleteFile, isLoading: isDeletingFile } =
    useDeleteFile(setFiles);
  const { handleRenameFile, isLoading: isRenaming } = useRenameFile(setFiles);
  const { handleDownloadFile, isLoading: isDownloading } = useDownloadFile();

  return (
    <>
      <BackButton />
      {isFilesLoading ? (
        <Spinner />
      ) : (
        <>
          {files?.map((file) => (
            <File key={file.id}>
              <Link to={`file/${file.id}`}>
                <Img src="/file.svg" />
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
                        >
                          Download
                        </Menus.Button>
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
