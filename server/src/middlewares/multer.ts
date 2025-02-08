import { Request } from "express";
import multer from "multer";

const storage = multer.memoryStorage();

const userPhotoFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedMimeTypes = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
  ];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploadUserPhotoMulter = multer({
  storage: storage,
  fileFilter: userPhotoFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
});

const uploadFilesMulter = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit for general files
});

export const uploadFiles = uploadFilesMulter.array("files");
export const uploadUserPhoto = uploadUserPhotoMulter.single("avatar");
