import { useEffect, useState } from "react";
import { Folder } from "../types/models";
import { getFolders } from "../services/apiFolders";

function Shared() {
  // const [folders, setFolders] = useState<Folder[]>([]);
  // useEffect(() => {
  //   async function fetchFolders() {
  //     try {
  //       const folders = await getFolders();
  //       setFolders(folders);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   fetchFolders();
  // }, []);
  // return (
  //   <div>
  //     {folders.map((folder) => (
  //       <div key={folder.id}>
  //         <h1>{folder.name}</h1>
  //         <p>{folder.size}</p>
  //         <p>{folder.fileCount}</p>
  //       </div>
  //     ))}
  //   </div>
  // );
  return <div>Shared</div>;
}

export default Shared;
