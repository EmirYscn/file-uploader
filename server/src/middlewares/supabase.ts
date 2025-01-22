import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

export const supabase = createClient(supabaseUrl!, supabaseKey!);

export const uploadFileSB = async (
  file: Express.Multer.File,
  userId: number
) => {
  const { originalname, buffer } = file;
  const blob = new Blob([buffer], { type: file.mimetype });
  const { data, error } = await supabase.storage
    .from("files")
    .upload(`uploads/user-${userId}/${originalname}`, blob);
  if (error) {
    console.log(error);
    throw error;
  }
  console.log("Uploaded file", data);
  const fileUrl = data.path;
  console.log("File Url", fileUrl);
  return fileUrl;
};

export const deleteFileSB = async (fileUrl: string) => {
  const { data, error } = await supabase.storage
    .from("files")
    .remove([fileUrl]);
  if (error) {
    console.log(error);
    throw error;
  }
  console.log("Deleted File with url: ", fileUrl);
};
