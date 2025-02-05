import { Outlet } from "react-router";

import Heading from "../ui/Heading";

function MyFolders() {
  return (
    <>
      <Heading as={"h1"} type={"bg"}>
        My Folders
      </Heading>

      <div>
        <Outlet />
      </div>
    </>
  );
}

export default MyFolders;
