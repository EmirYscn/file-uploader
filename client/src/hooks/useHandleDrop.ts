import { useContext, useState } from "react";
import { FoldersContext } from "../contexts/foldersContext";
import { updateFile } from "../services/apiFiles";
import { updateFolder } from "../services/apiFolders";
import { File, FolderWithShareInfo } from "../types/models";
import { FilesContext } from "../contexts/filesContext";

function useHandleDrop() {
  const { setFolders } = useContext(FoldersContext);
  const { setFiles } = useContext(FilesContext);
  const [dragOverFolderId, setDragOverFolderId] = useState<number | null>(null);

  function handleDragStart(e: React.DragEvent<HTMLImageElement>) {
    const target = e.currentTarget;
    if (!target.id) return;
    e.dataTransfer.setData("folderId", target.id);
    e.dataTransfer.setData("type", "folder");
    e.dataTransfer.effectAllowed = "move";
  }

  function handleDragOver(
    e: React.DragEvent<HTMLImageElement>,
    folderId: number
  ) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverFolderId(folderId);
  }

  function handleDragLeave() {
    setDragOverFolderId(null); // Reset when drag leaves
  }

  async function handleDrop(
    e: React.DragEvent<HTMLImageElement>,
    currentFolderId: number
  ) {
    e.preventDefault();
    setDragOverFolderId(null);
    // Get the type of the target
    const dataType = e.dataTransfer.getData("type");
    if (dataType === "folder") {
      const folderId = Number(e.dataTransfer.getData("folderId"));
      // Prevent drop on same folder
      if (currentFolderId === folderId) return;
      // handle folder drop
      const data = {
        parentId: currentFolderId,
      };
      try {
        await updateFolder(folderId, data);
        setFolders((prevFolders) => {
          if (!prevFolders) return prevFolders;
          const updatedFolders = prevFolders.filter(
            (folder) => folder.id !== folderId
          );
          return updatedFolders;
        });
      } catch (error) {
        console.log(error);
      }

      console.log(dataType, folderId);
    } else if (dataType === "file") {
      const fileId = Number(e.dataTransfer.getData("fileId"));
      const fileParentId = Number(e.dataTransfer.getData("parentId"));
      // Prevent drop on same folder
      if (currentFolderId === fileParentId) return;
      // handle file drop
      const data = {
        folderId: currentFolderId,
      };
      try {
        await updateFile(fileId, data);
        setFiles((prevFiles) => {
          if (!prevFiles) return prevFiles;
          const updatedFiles = prevFiles.filter((file) => file.id !== fileId);
          return updatedFiles;
        });
      } catch (error) {
        console.log(error);
      }
      console.log(dataType, fileId);
    }
  }
  return {
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragLeave,
    dragOverFolderId,
  };
}

export default useHandleDrop;
