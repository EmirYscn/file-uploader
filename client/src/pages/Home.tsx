import { Outlet } from "react-router";

import Heading from "../ui/Heading";

function Home() {
  return (
    <>
      <Heading as={"h1"} type={"bg"}>
        All Folders
      </Heading>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default Home;
