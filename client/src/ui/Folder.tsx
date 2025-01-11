import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getFolder } from "../services/apiFolders";
import { Folder as FolderType } from "../types/models";
import styled from "styled-components";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import Modal from "./Modal";
import Menus from "./Menus";
import { RiDeleteBin2Line } from "react-icons/ri";
import ConfirmDelete from "./ConfirmDelete";
import { AiOutlineDownload } from "react-icons/ai";
import { MdDriveFileRenameOutline, MdPersonAddAlt1 } from "react-icons/md";

const StyledFolder = styled.div`
  display: grid;
  grid-template-columns: repeat(8, minmax(auto, 100px));
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

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  /* align-items: end; */

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-grey-700);
  }
`;

const BackButton = styled.button`
  padding: 0.5em 1em;
  border: none;
  border-radius: 6px;
  font-size: small;
  position: absolute;
  left: -3rem;
  top: -3rem;

  &:hover {
    background-color: #fffb09a0;
  }
`;

function Folder() {
  const { folderId } = useParams();
  const [folder, setFolder] = useState<FolderType | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchFolder() {
      try {
        const folder = await getFolder(Number(folderId));
        setFolder(folder);
      } catch (error) {
        console.log(error);
      }
    }
    fetchFolder();
  }, [folderId]);

  return (
    <>
      <BackButton onClick={() => navigate(-1)}>
        <FaArrowAltCircleLeft />
      </BackButton>
      <StyledFolder>
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

                    {/* <Modal.Window name="rename">
                    <RenameFileForm />
                    </Modal.Window>
                    <Modal.Window name="share">
                    <ShareFileForm />
                    </Modal.Window> */}
                    <Modal.Window name="delete">
                      <ConfirmDelete resourceName={file.name} />
                    </Modal.Window>
                  </Menus.Menu>
                </Menus>
              </Modal>
            </Details>
          </File>
        ))}
      </StyledFolder>
    </>
  );
}

export default Folder;
