import { File } from "../types/models";

export const getMainFiles = async (userId: number) => {
  try {
    const res = await fetch(`/api/files/main/${userId}`);

    const files: File[] = await res.json();

    return files;
  } catch (error) {
    console.log(error);
  }
};

export const getFilesByFolder = async (folderId: number) => {
  try {
    const res = await fetch(`/api/files/${folderId}`);

    const files: File[] = await res.json();

    return files;
  } catch (error) {
    console.log(error);
  }
};

export const deleteFile = async (fileId: number) => {
  try {
    const response = await fetch(`/api/files/${fileId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.log(error);
  }
};

export const renameFile = async (fileId: number, data: File) => {
  try {
    const response = await fetch(`/api/files/${fileId}`, {
      method: "PATCH",
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

export const updateFile = async (fileId: number, data: Partial<File>) => {
  try {
    const response = await fetch(`/api/files/${fileId}`, {
      method: "PATCH",
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
): Promise<File[] | undefined> => {
  console.log(data);
  try {
    const res = await fetch("/api/files/upload", {
      method: "POST",
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
    const res = await fetch(`/api/files/${fileId}/download`);

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
    const res = await fetch(`/api/files/${shareUrl}/shared`);

    const files: File[] = await res.json();

    return files;
  } catch (error) {
    console.log(error);
  }
};

export async function getFilesByShareUrlAndFolderId(
  shareUrl: string,
  folderId: number
) {
  const res = await fetch(`/api/shared/${shareUrl}/files/${folderId}`);

  if (!res.ok) throw new Error("Failed to fetch shared files");

  const files: File[] = await res.json();

  return files;
}
