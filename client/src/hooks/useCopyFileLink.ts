import { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

function useCopyFileLink() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleCopyFileLink(fileId: number) {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/files/${fileId}/shareUrl`);
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

  return { handleCopyFileLink, isLoading };
}

export default useCopyFileLink;
