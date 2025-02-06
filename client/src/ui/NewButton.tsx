import { useLocation } from "react-router";
import { useContext, useRef, useState } from "react";
import styled from "styled-components";
import { BsFileEarmarkPlusFill } from "react-icons/bs";
import { FiFolderPlus } from "react-icons/fi";

import Modal from "./Modal";
import AddFolder from "./Modals/AddFolder";

import useCreateFolder from "../hooks/useCreateFolder";
import useCreateFile from "../hooks/useCreateFile";

import { FoldersContext } from "../contexts/foldersContext";
import { FilesContext } from "../contexts/filesContext";
import DragDropBox from "./DragDropBox";

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
  color: var(--color-brand-800);
  display: flex;
  justify-content: center;
  width: max-content;
  transition: all 0.5s;

  & svg {
    height: 3rem;
    width: auto;
  }

  &:hover {
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
  const [dragDropModalOpen, setDragDropModalOpen] = useState(false);
  const location = useLocation();
  const isInShared = location.pathname.includes("shared");
  // const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { setFolders, isLoading: isFoldersLoading } =
    useContext(FoldersContext);
  const { handleCreateFolder, isLoading: isCreatingFolder } =
    useCreateFolder(setFolders);

  return (
    <>
      {!dragDropModalOpen ? (
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

          <Button
            onClick={() => setDragDropModalOpen(true)}
            disabled={isInShared}
          >
            <BsFileEarmarkPlusFill />
          </Button>
        </StyledNewButton>
      ) : (
        <DragDropBox onCancel={() => setDragDropModalOpen(false)} />
      )}
    </>
  );
}

export default NewButton;
