import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import { sanitizeFilename } from "../utils/sanitizeFilename";

export const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

export const supabase = createClient(supabaseUrl!, supabaseKey!);

export const uploadFile = async (file: Express.Multer.File, userId: number) => {
  const { originalname, buffer, mimetype } = file;
  const uniqueFileName = `${uuidv4()}-${sanitizeFilename(originalname)}`;
  const { data, error } = await supabase.storage
    .from("files")
    .upload(`uploads/user-${userId}/${uniqueFileName}`, buffer, {
      contentType: mimetype,
    });
  if (error) {
    console.log(error);
    throw error;
  }
  console.log("Uploaded file", data);
  const fileUrl = data.path;
  console.log("File Url", fileUrl);
  return fileUrl;
};

export const uploadAvatar = async (
  file: Express.Multer.File,
  userId: number
) => {
  const { buffer } = file;
  const filePath = `user-${userId}/avatar.jpeg`; // Ensure only one file per user

  try {
    // 🗑️ Delete existing file first (if it exists)
    await supabase.storage.from("avatars").remove([filePath]);

    // 📤 Upload the new file (ensuring the same file path)
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, buffer, { contentType: "image/jpeg" });

    if (uploadError) throw uploadError;

    // 🔗 Get Public URL
    const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error("Error uploading avatar:", error);
    throw error;
  }
};

export const deleteFile = async (fileUrl: string) => {
  const { data, error } = await supabase.storage
    .from("files")
    .remove([fileUrl]);
  if (error) {
    console.log(error);
    throw error;
  }
  console.log("Deleted File with url: ", fileUrl);
};

export const downloadFile = async (fileUrl: string) => {
  const { data, error } = await supabase.storage
    .from("files")
    .download(fileUrl);
  if (error) {
    console.log(error);
    throw error;
  }
  console.log("Downloaded File with url: ", fileUrl);
  return data;
};
