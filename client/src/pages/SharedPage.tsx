import { Outlet, useOutletContext } from "react-router";

import Heading from "../ui/Heading";

function Shared() {
  const {
    isMultiSelect,
    selectedFileIds,
    setSelectedFileIds,
    selectedFolderIds,
    setSelectedFolderIds,
  } = useOutletContext<{
    isMultiSelect: boolean;
    selectedFileIds: number[];
    setSelectedFileIds: React.Dispatch<React.SetStateAction<number[]>>;
    selectedFolderIds: number[];
    setSelectedFolderIds: React.Dispatch<React.SetStateAction<number[]>>;
  }>();
  return (
    <>
      <Heading as={"h1"} type={"bg"}>
        Shared Folders
      </Heading>
      <div>
        <Outlet
          context={{
            isMultiSelect,
            selectedFileIds,
            setSelectedFileIds,
            selectedFolderIds,
            setSelectedFolderIds,
          }}
        />
      </div>
    </>
  );
}

export default Shared;
