import styled from "styled-components";
import Sort from "./Sort";
import ToggleSelect from "./ToggleSelect";
import { useState } from "react";

const ActionContainer = styled.div`
  display: flex;
  justify-content: center;
  justify-self: end;
  margin-top: -1rem;
  margin-bottom: 3rem;
`;

type ActionNavProps = {
  isMultiSelect: boolean;
  setIsMultiSelect: React.Dispatch<React.SetStateAction<boolean>>;
  selectedFileIds: number[];
  setSelectedFileIds: React.Dispatch<React.SetStateAction<number[]>>;
  selectedFolderIds: number[];
  setSelectedFolderIds: React.Dispatch<React.SetStateAction<number[]>>;
};

function ActionNav({
  isMultiSelect,
  setIsMultiSelect,
  selectedFileIds,
  setSelectedFileIds,
  selectedFolderIds,
  setSelectedFolderIds,
}: ActionNavProps) {
  return (
    <ActionContainer>
      <ToggleSelect
        isMultiSelect={isMultiSelect}
        setIsMultiSelect={setIsMultiSelect}
        selectedFileIds={selectedFileIds}
        setSelectedFileIds={setSelectedFileIds}
        selectedFolderIds={selectedFolderIds}
        setSelectedFolderIds={setSelectedFolderIds}
      />
      <Sort />
    </ActionContainer>
  );
}

export default ActionNav;
