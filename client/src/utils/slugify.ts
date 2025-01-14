import { Folder } from "../types/models";

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "");
}

export function generateFolderSlug(folder: Folder) {
  return `${slugify(folder.name)}-${folder.id}`;
}
