import { SetStateAction, useContext, useState } from "react";
import styled, { css } from "styled-components";
import { ThemeContext } from "../contexts/themeContext";
import { FilesContext } from "../contexts/filesContext";
import { deleteFiles } from "../services/apiFiles";
import { FoldersContext } from "../contexts/foldersContext";
import { deleteFolders } from "../services/apiFolders";

interface ToggleButtonProps {
  isActive?: boolean;
  isDark?: boolean;
}

const ToggleButton = styled.button<ToggleButtonProps>`
  background: ${({ isActive }) => (isActive ? "#6871f1" : "#262626")};
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: ${({ isActive }) => (isActive ? "#5a62d1" : "#aaa")};
  }

  ${({ isDark, isActive }) =>
    isDark &&
    css`
      background: ${isActive ? "#6871f1" : "#ededed"};
      color: black;
    `}
`;

const StyledToggleSelect = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

function ToggleSelect({
  isMultiSelect,
  setIsMultiSelect,
  selectedFileIds,
  setSelectedFileIds,
  selectedFolderIds,
  setSelectedFolderIds,
}: {
  isMultiSelect: boolean;
  setIsMultiSelect: React.Dispatch<React.SetStateAction<boolean>>;
  selectedFileIds: number[];
  setSelectedFileIds: React.Dispatch<SetStateAction<number[]>>;
  selectedFolderIds: number[];
  setSelectedFolderIds: React.Dispatch<SetStateAction<number[]>>;
}) {
  const { isDark } = useContext(ThemeContext);
  const { setFiles } = useContext(FilesContext);
  const { setFolders } = useContext(FoldersContext);

  const deleteCount = selectedFileIds.length + selectedFolderIds.length;

  const [isLoading, setIsLoading] = useState(false);

  async function handleDelete() {
    if (deleteCount === 0) return;

    try {
      setIsLoading(true);

      if (selectedFileIds.length > 0) {
        await deleteFiles(selectedFileIds);

        setFiles((prevFiles) =>
          prevFiles
            ? prevFiles.filter((file) => !selectedFileIds.includes(file.id))
            : prevFiles
        );
      }

      if (selectedFolderIds.length > 0) {
        await deleteFolders(selectedFolderIds);

        setFolders((prevFolders) =>
          prevFolders
            ? prevFolders.filter(
                (folder) => !selectedFolderIds.includes(folder.id)
              )
            : prevFolders
        );
      }

      setSelectedFileIds([]);
      setSelectedFolderIds([]);
      setIsMultiSelect(false);
    } catch (error) {
      console.log("Error deleting files:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <StyledToggleSelect>
      {isMultiSelect && deleteCount > 0 && (
        <ToggleButton
          // isActive={isMultiSelect}
          // isDark={isDark}
          // onClick={() => setIsMultiSelect((prev) => !prev)}
          onClick={handleDelete}
          disabled={isLoading}
        >
          Delete {deleteCount}
        </ToggleButton>
      )}
      <ToggleButton
        isActive={isMultiSelect}
        isDark={isDark}
        onClick={() => {
          setIsMultiSelect((prev) => !prev);
          setSelectedFileIds([]);
          setSelectedFolderIds([]);
        }}
        disabled={isLoading}
      >
        {isMultiSelect ? "Cancel" : "Select"}
      </ToggleButton>
    </StyledToggleSelect>
  );
}

export default ToggleSelect;
