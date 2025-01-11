import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getFolder } from "../services/apiFolders";
import { Folder as FolderType } from "../types/models";

function Folder() {
  const { folderId } = useParams();
  const [folder, setFolder] = useState<FolderType | undefined>();

  useEffect(() => {
    async function fetchFolder() {
      try {
        const folder = await getFolder(Number(folderId));
        setFolder(folder);
      } catch (error) {
        console.log(error);
      }
    }
    fetchFolder();
  }, [folderId]);

  return (
    <div>
      {folder?.files.map((file) => (
        <span>{file.name}</span>
      ))}
    </div>
  );
}

export default Folder;
