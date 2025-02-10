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
  selectedIds: number[];
  setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>;
};

function ActionNav({
  isMultiSelect,
  setIsMultiSelect,
  selectedIds,
  setSelectedIds,
}: ActionNavProps) {
  return (
    <ActionContainer>
      <ToggleSelect
        isMultiSelect={isMultiSelect}
        setIsMultiSelect={setIsMultiSelect}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
      />
      <Sort />
    </ActionContainer>
  );
}

export default ActionNav;
