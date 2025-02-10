import { Outlet, useOutletContext } from "react-router";

import Heading from "../ui/Heading";

function Home() {
  const { isMultiSelect, selectedIds, setSelectedIds } = useOutletContext<{
    isMultiSelect: boolean;
    selectedIds: number[];
    setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>;
  }>();
  return (
    <>
      <Heading as={"h1"} type={"bg"}>
        All Folders
      </Heading>
      <div>
        <Outlet context={{ isMultiSelect, selectedIds, setSelectedIds }} />
      </div>
    </>
  );
}

export default Home;
