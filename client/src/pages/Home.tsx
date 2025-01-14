import { Outlet } from "react-router";
import styled from "styled-components";
import Heading from "../ui/Heading";

// const Heading = styled.h1`
//   font-size: 5em;
//   opacity: 0.1;
//   position: absolute;
//   left: -11rem;
//   top: -7.7rem;
//   color: var(--color-grey-400);
//   pointer-events: none;
// `;

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
  // const { folders, isLoading } = useFolders();

  // return folders && <Folders folders={folders} isLoading={isLoading} />;
}

export default Home;
