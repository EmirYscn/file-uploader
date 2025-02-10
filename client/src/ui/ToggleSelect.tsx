import { SetStateAction, useContext, useState } from "react";
import styled, { css } from "styled-components";
import { ThemeContext } from "../contexts/themeContext";
import { FilesContext } from "../contexts/filesContext";
import { deleteFiles } from "../services/apiFiles";

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
  selectedIds,
  setSelectedIds,
}: {
  isMultiSelect: boolean;
  setIsMultiSelect: React.Dispatch<React.SetStateAction<boolean>>;
  selectedIds: number[];
  setSelectedIds: React.Dispatch<SetStateAction<number[]>>;
}) {
  const { isDark } = useContext(ThemeContext);
  const { setFiles } = useContext(FilesContext);
  const deleteCount = selectedIds.length;
  const [isLoading, setIsLoading] = useState(false);

  async function handleDelete() {
    if (selectedIds.length === 0) return;

    try {
      setIsLoading(true);

      await deleteFiles(selectedIds);

      setFiles((prevFiles) =>
        prevFiles
          ? prevFiles.filter((file) => !selectedIds.includes(file.id))
          : prevFiles
      );

      setSelectedIds([]);
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
          setSelectedIds([]);
        }}
        disabled={isLoading}
      >
        {isMultiSelect ? "Cancel" : "Select"}
      </ToggleButton>
    </StyledToggleSelect>
  );
}

export default ToggleSelect;
