import { useState } from "react";
import { downloadFile } from "../services/apiFiles";

function useDownloadFile() {
  const [isLoading, setIsLoading] = useState(false);
  async function handleDownloadFile(fileId: number, fileName: string) {
    try {
      setIsLoading(true);
      await downloadFile(fileId, fileName);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }
  return { handleDownloadFile, isLoading };
}

export default useDownloadFile;
