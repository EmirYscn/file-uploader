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

import useFolder from "../hooks/useFolder";
import useDeleteFile from "../hooks/useDeleteFile";
import useRenameFile from "../hooks/useRenameFile";
import { File as FileType } from "../types/models";
import { Link } from "react-router";

const StyledFolder = styled.div`
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
  display: flex;
  align-items: center;
`;

const SubFolder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Folder() {
  const { folder, setFolder, isLoading } = useFolder();
  const { handleDeleteFile, isLoading: isDeleting } = useDeleteFile(setFolder);
  const { handleRenameFile, isLoading: isRenaming } = useRenameFile(setFolder);
  // const { handleDeleteFolder, isLoading: isFolderDeleting } =
  //   useDeleteFolder(setFolder);
  return (
    <>
      <BackButton />
      {isLoading ? (
        <Spinner />
      ) : (
        <StyledFolder>
          {folder?.children?.map((folder) => (
            <SubFolder key={folder.id}>
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
            </SubFolder>
          ))}
          {folder?.files.map((file) => (
            <File key={file.id}>
              <Img src="/file.svg" />
              <Details>
                <span>{file.name}</span>
                <Modal>
                  <Menus>
                    <Menus.Menu>
                      <Menus.Toggle id={file.id} />
                      <Menus.List id={file.id}>
                        <Menus.Button icon={<AiOutlineDownload />}>
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
                          disabled={isDeleting}
                          onConfirm={() => handleDeleteFile(file.id)}
                        />
                      </Modal.Window>
                    </Menus.Menu>
                  </Menus>
                </Modal>
              </Details>
            </File>
          ))}
        </StyledFolder>
      )}
    </>
  );
}

export default Folder;
