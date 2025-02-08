import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://qksidnihrezykfpnsanc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrc2lkbmlocmV6eWtmcG5zYW5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0ODI1MTYsImV4cCI6MjA1MzA1ODUxNn0.sAOTTgJFSrHwo8VCZDsG3cmd2C6gJRvnAYxd_YpxvwA"
);

export function getUserImage(userAvatarUrl: string) {
  const { data } = supabase.storage.from("avatars").getPublicUrl(userAvatarUrl);
  return data.publicUrl;
}
