import { set } from "date-fns";
import { useContext, useState } from "react";
import styled, { css } from "styled-components";
import useCreateFile from "../hooks/useCreateFile";
import { FilesContext } from "../contexts/filesContext";
import { ThemeContext } from "../contexts/themeContext";
import FilesLoadingSpinner from "./FilesLoadingSpinner";

const DropZoneBox = styled.div<{ isDark?: boolean }>`
  border-radius: 1em;
  min-width: 25rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
    rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
  max-width: 36rem;
  width: 100%;
  background: var(--dropzone-bg);

  & h2 {
    font-size: 1.4rem;
    margin-bottom: 0.6rem;
    color: var(--headline);
  }

  & p {
    font-size: 1.15rem;
    color: var(--gray);
  }

  ${(props) =>
    props.isDark &&
    css`
      background-color: var(--color-black-300);
      color: var(--color-grey-200);

      & h2 {
        color: var(--color-grey-200);
      }

      & p {
        color: var(--color-grey-200);
      }
    `}
`;

const DropZoneArea = styled.div<{ $isDragOver: boolean; isDark?: boolean }>`
  padding: 1rem;
  position: relative;
  margin-top: 1.5rem;
  min-height: 16rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  border: 2px dashed var(--dropzone-border);
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: var(--dropzone-hover);
  }

  ${(props) =>
    props.$isDragOver &&
    css`
      border: 2px solid var(--color-brand-500);
      background: var(--dropzone-over);
    `}

  ${(props) =>
    props.isDark &&
    css`
      color: var(--color-grey-200);
    `}
`;

const DropZoneDescription = styled.div<{ isDark?: boolean }>`
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
`;

const FileInfo = styled.div<{ isDark?: boolean }>`
  font-size: 1.1rem;

  & ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    & li {
      text-align: left;
    }
  }

  ${(props) =>
    props.isDark &&
    css`
      color: var(--color-grey-200);
    `}
`;

const FileInput = styled.input<{ isDark?: boolean }>`
  cursor: pointer;
  position: absolute;
  opacity: 0;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  ${(props) =>
    props.isDark &&
    css`
      color: var(--color-grey-200);
    `}
`;

const FileUploadIcon = styled.label<{ isDark?: boolean }>`
  & svg {
    height: 6rem;
    max-width: 6rem;
    width: 100%;
    margin-bottom: 0.5rem;
    stroke: var(--headline);
  }

  ${(props) =>
    props.isDark &&
    css`
      color: var(--color-grey-200);
    `}
`;

const DropZoneActions = styled.div<{ isDark?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  gap: 1rem;

  & button {
    flex-grow: 1;
    min-height: 3rem;
    font-size: 1.2rem;
    font-weight: 600;
    border: none;
    transition: background 0.3s ease;
  }
  & button[type="reset"] {
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    color: var(--text);
    background: transparent;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  & button[type="reset"]:hover {
    color: var(--color-brand-500);
  }

  & button[type="submit"] {
    background: var(--color-brand-600);
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    color: var(--text);
    border: none;
    cursor: pointer;
  }

  & button[type="submit"]:hover {
    background: var(--color-brand-500);
  }

  ${(props) =>
    props.isDark &&
    css`
      color: var(--color-grey-200);

      & button[type="reset"] {
        color: var(--color-grey-200);
      }
    `}
`;

const DropZoneHelp = styled.div<{ isDark?: boolean }>`
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  ${(props) =>
    props.isDark &&
    css`
      color: var(--color-grey-200);
    `}
`;

const ActionButtons = styled.div<{ isDark?: boolean }>`
  display: flex;
  gap: 0.5rem;
  max-width: 12rem;

  ${(props) =>
    props.isDark &&
    css`
      color: var(--color-grey-200);
    `}
`;

function DragDropBox({ onCancel }: { onCancel: () => void }) {
  const {
    files: filesContext,
    setFiles: setFilesContext,
    isLoading: isFilesLoading,
  } = useContext(FilesContext);
  const { handleCreateFile, isLoading: isCreatingFile } =
    useCreateFile(setFilesContext);
  const { isDark } = useContext(ThemeContext);

  const [isDragOver, setIsDragOver] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const fileLimit = 25 * 1024 * 1024; // 25MB

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      processFiles(Array.from(fileList));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    processFiles(Array.from(e.dataTransfer.files));
  };

  const processFiles = (selectedFiles: File[]) => {
    const totalSize = selectedFiles.reduce((acc, file) => acc + file.size, 0);

    if (totalSize > fileLimit) {
      alert("File is over 25MB");
      return;
    }
    setFiles(selectedFiles);
  };

  const handleFileUpload = async () => {
    if (files.length > 0) {
      console.log(files);
      await handleCreateFile(files);
      onCancel();
    }
  };

  return (
    <div>
      <DropZoneBox isDark={isDark}>
        <h2>Upload File</h2>
        <p>Click to upload or drag and drop</p>
        <DropZoneArea
          onDragOver={(e) => {
            e.preventDefault();
            e.currentTarget.classList.add("drag-over");
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            handleDrop(e);
            setIsDragOver(false);
          }}
          $isDragOver={isDragOver}
          isDark={isDark}
        >
          <FileUploadIcon
            htmlFor="upload-file"
            isDark={isDark}
          ></FileUploadIcon>
          <FileInput
            type="file"
            required
            multiple
            id="upload-file"
            name="uploaded-file"
            onChange={handleFileChange}
            isDark={isDark}
          />
          <FileInfo id="file-info" isDark={isDark}>
            {files.length > 0 ? (
              <ul>
                {files.map((file, index) => (
                  <li key={index}>
                    {file.name} - {(file.size / 1024 / 1024).toFixed(2)} MB
                    {isCreatingFile && <FilesLoadingSpinner />}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No files selected</p>
            )}
          </FileInfo>
        </DropZoneArea>
        {/* <DropZoneDescription>
          <span>Supported Formats: JPEG, JPG, PNG, ...</span>
          <span>Max file size: 25MB</span>
        </DropZoneDescription> */}
        <DropZoneActions isDark={isDark}>
          <DropZoneHelp isDark={isDark}>Max file size: 25MB</DropZoneHelp>
          <ActionButtons isDark={isDark}>
            <button
              type="reset"
              onClick={() => {
                setFiles([]);
                onCancel();
              }}
            >
              Cancel
            </button>
            <button
              id="submit-button"
              type="submit"
              onClick={handleFileUpload}
              disabled={isCreatingFile}
            >
              Save
            </button>
          </ActionButtons>
        </DropZoneActions>
      </DropZoneBox>
    </div>
  );
}

export default DragDropBox;
