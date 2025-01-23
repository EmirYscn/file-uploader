import { BsFileEarmarkPlusFill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { FiFolderPlus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import styled from "styled-components";
import Modal from "./Modal";
import AddFolder from "./AddFolder";
import { useContext, useRef } from "react";
import { FoldersContext } from "../contexts/foldersContext";
import { createFolder } from "../services/apiFolders";
import { Folder } from "../types/models";
import useCreateFolder from "../hooks/useCreateFolder";
import Input from "./Input";
import { FilesContext } from "../contexts/filesContext";
import useCreateFile from "../hooks/useCreateFile";

const StyledNewButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 1em 1.2em;
  border: none;
  border-radius: 6px;
  font-size: medium;
  background-color: rgba(255, 255, 255, 0.1);
  /* background-color: var(--color-brand-800); */
  color: var(--color-brand-800);
  /* box-shadow: var(--shadow-lg); */
  display: flex;
  justify-content: center;
  width: max-content;
  transition: all 0.5s;

  & svg {
    height: 3rem;
    width: auto;
  }

  &:hover {
    /* opacity: 0.5; */
    transform: scale(1.1);
  }
`;

function NewButton() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { setFolders, isLoading: isFoldersLoading } =
    useContext(FoldersContext);
  const { setFiles, isLoading: isFilesLoading } = useContext(FilesContext);

  const { handleCreateFolder, isLoading: isCreatingFolder } =
    useCreateFolder(setFolders);
  const { handleCreateFile, isLoading: isCreatingFile } =
    useCreateFile(setFiles);

  function handleAddFile() {
    fileInputRef.current?.click();
  }
  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      console.log("File", file);
      handleCreateFile(file);
    }
  }
  return (
    <StyledNewButton>
      <Modal>
        <Modal.Open opens="addFolder">
          <Button>
            <FiFolderPlus />
          </Button>
        </Modal.Open>
        <Modal.Window name="addFolder">
          <AddFolder
            onConfirm={handleCreateFolder}
            disabled={isCreatingFolder}
          />
        </Modal.Window>
      </Modal>

      <Button onClick={handleAddFile} disabled={isCreatingFile}>
        <BsFileEarmarkPlusFill />
        <input
          type="file"
          name="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </Button>
    </StyledNewButton>
  );
}

export default NewButton;
