import { Outlet } from "react-router";

import Heading from "../ui/Heading";

function Shared() {
  return (
    <>
      <Heading as={"h1"} type={"bg"}>
        Shared to me
      </Heading>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default Shared;
