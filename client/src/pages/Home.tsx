import { useContext, useEffect, useState } from "react";
import { getFolders } from "../services/apiFolders";
import { Folder } from "../types/models";
import { UserContext } from "../contexts/userContext";

function Home() {
  const [folders, setFolders] = useState<Folder[] | undefined>([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function fetchFolders() {
      try {
        const folders = await getFolders(user!.id);
        setFolders(folders);
      } catch (error) {
        console.log(error);
      }
    }
    if (user) fetchFolders();
  }, [user]);

  return (
    <>
      {folders && folders?.length > 0 && (
        <div>
          {folders.map((folder) => (
            <div key={folder.id}>
              <h1>{folder.name}</h1>
              <p>{folder.size}</p>
              <p>{folder.fileCount}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Home;
