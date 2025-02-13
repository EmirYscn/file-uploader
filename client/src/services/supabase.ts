import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export function getUserImage(userAvatarUrl: string) {
  const { data } = supabase.storage.from("avatars").getPublicUrl(userAvatarUrl);
  return data.publicUrl;
}
