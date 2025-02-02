import { BsFileEarmarkPlusFill } from "react-icons/bs";

import { FiFolderPlus } from "react-icons/fi";

import styled from "styled-components";
import Modal from "./Modal";
import AddFolder from "./AddFolder";
import { useContext, useRef } from "react";
import { FoldersContext } from "../contexts/foldersContext";

import useCreateFolder from "../hooks/useCreateFolder";

import { FilesContext } from "../contexts/filesContext";
import useCreateFile from "../hooks/useCreateFile";
import { useLocation } from "react-router";

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
  background: none;
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
    transform: scale(1.2);
  }
  &:active {
    border: none;
    outline: none;
  }

  &:focus {
    outline: none;
  }
  &:disabled {
    cursor: not-allowed;
    color: rgba(0, 0, 0, 0.317);
  }
`;

function NewButton() {
  const location = useLocation();
  const isInShared = location.pathname.includes("shared");
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
      handleCreateFile(file);
    }
  }
  return (
    <StyledNewButton>
      <Modal>
        <Modal.Open opens="addFolder">
          <Button disabled={isInShared || isFoldersLoading}>
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

      <Button onClick={handleAddFile} disabled={isInShared || isCreatingFile}>
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
