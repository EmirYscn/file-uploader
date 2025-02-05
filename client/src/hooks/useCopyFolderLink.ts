import { useState } from "react";

function useCopyFolderLink() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleCopyFolderLink(folderId: number) {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/folders/${folderId}/shareUrl`);
      if (!res.ok) {
        throw new Error("Failed to get share URL");
      }
      const url = await res.json();
      const shareUrl = `${window.location.origin}/sharedurl/${url}`;
      navigator.clipboard.writeText(shareUrl);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return { handleCopyFolderLink, isLoading };
}

export default useCopyFolderLink;
