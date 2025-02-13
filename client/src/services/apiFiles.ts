import { FileWithUserInfo } from "../types/models";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

export const getMainFiles = async (userId: number) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/files/main/${userId}`, {
      method: "GET",
      credentials: "include",
    });

    const files: FileWithUserInfo[] = await res.json();

    return files;
  } catch (error) {
    console.log(error);
  }
};

export const getFilesByFolder = async (folderId: number) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/files/${folderId}`, {
      method: "GET",
      credentials: "include",
    });

    const files: FileWithUserInfo[] = await res.json();

    return files;
  } catch (error) {
    console.log(error);
  }
};

export const deleteFile = async (fileId: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/files/${fileId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteFiles = async (fileIds: number[]) => {
  try {
    const deleteRequests = fileIds.map(async (fileId) => {
      const response = await fetch(`${API_BASE_URL}/api/files/${fileId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(
          `Failed to delete file ${fileId}: ${response.statusText}`
        );
      }
    });

    await Promise.all(deleteRequests);

    console.log(`Deleted ${fileIds.length} files successfully.`);
  } catch (error) {
    console.error("Error deleting files:", error);
  }
};

export const renameFile = async (fileId: number, data: FileWithUserInfo) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/files/${fileId}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateFile = async (
  fileId: number,
  data: Partial<FileWithUserInfo>
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/files/${fileId}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.log(error);
  }
};

export const createFile = async (
  data: FormData
): Promise<FileWithUserInfo[] | undefined> => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/files/upload`, {
      method: "POST",
      credentials: "include",
      body: data,
    });

    if (!res.ok) {
      throw new Error("Error uploading data");
    }

    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const downloadFile = async (fileId: number, fileName: string) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/files/${fileId}/download`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Error downloading file");
    }

    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = fileName;
    document.body.appendChild(link);

    link.click();
    link.remove();

    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getFileByShareUrl = async (shareUrl: string) => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/files/${shareUrl}/shared`, {
      method: "GET",
      credentials: "include",
    });

    const files: FileWithUserInfo[] = await res.json();

    return files;
  } catch (error) {
    console.log(error);
  }
};

export async function getFilesByShareUrlAndFolderId(
  shareUrl: string,
  folderId: number
) {
  const res = await fetch(
    `${API_BASE_URL}/api/files/shared/${shareUrl}/files/${folderId}`,
    { method: "GET", credentials: "include" }
  );

  if (!res.ok) throw new Error("Failed to fetch shared files");

  const files: FileWithUserInfo[] = await res.json();

  return files;
}
