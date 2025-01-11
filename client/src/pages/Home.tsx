import { useContext, useEffect, useState } from "react";
import { getFolders } from "../services/apiFolders";
import { Folder } from "../types/models";
import { UserContext } from "../contexts/userContext";
import Folders from "../ui/Folders";

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

  return folders && <Folders folders={folders} />;
}

export default Home;
