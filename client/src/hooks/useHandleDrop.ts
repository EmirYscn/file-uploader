import { useContext, useState } from "react";

import { FoldersContext } from "../contexts/foldersContext";
import { FilesContext } from "../contexts/filesContext";

import { updateFile } from "../services/apiFiles";
import { updateFolder } from "../services/apiFolders";

function useHandleDrop() {
  const { setFolders } = useContext(FoldersContext);
  const { setFiles } = useContext(FilesContext);
  const [dragOverFolderId, setDragOverFolderId] = useState<number | null>(null);

  function handleDragStart(e: React.DragEvent<HTMLElement>) {
    const target = e.currentTarget;
    if (!target.id) return;
    e.dataTransfer.setData("folderId", target.id);
    e.dataTransfer.setData("type", "folder");
    e.dataTransfer.effectAllowed = "move";
  }

  function handleDragOver(e: React.DragEvent<HTMLElement>, folderId: number) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverFolderId(folderId);

    // Auto-scroll logic
    const container = e.currentTarget.closest(".scroll-container"); // Adjust selector if needed
    if (container) {
      const { top, bottom } = container.getBoundingClientRect();
      const scrollSpeed = 10; // Adjust speed as needed
      const buffer = 50; // Distance from edge to trigger scroll

      if (e.clientY < top + buffer) {
        container.scrollTop -= scrollSpeed; // Scroll up
      } else if (e.clientY > bottom - buffer) {
        container.scrollTop += scrollSpeed; // Scroll down
      }
    }
  }

  function handleDragLeave() {
    setDragOverFolderId(null); // Reset when drag leaves
  }

  async function handleDrop(
    e: React.DragEvent<HTMLElement>,
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
