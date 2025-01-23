import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

export const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

export const supabase = createClient(supabaseUrl!, supabaseKey!);

export const uploadFile = async (file: Express.Multer.File, userId: number) => {
  const { originalname, buffer, mimetype } = file;
  const uniqueFileName = `${uuidv4()}-${originalname}`;
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
