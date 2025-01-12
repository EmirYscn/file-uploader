import { File } from "../types/models";

export const deleteFile = async (fileId: number) => {
  try {
    console.log("in deleteFIle");
    const response = await fetch(`/api/files/${fileId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log("file deleted");
  } catch (error) {
    console.log(error);
  }
};

export const renameFile = async (fileId: number, data: File) => {
  try {
    console.log(fileId);
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
