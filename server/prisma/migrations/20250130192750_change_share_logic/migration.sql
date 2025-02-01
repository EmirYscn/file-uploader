/*
  Warnings:

  - You are about to drop the column `isAccessLimited` on the `Folder` table. All the data in the column will be lost.
  - You are about to drop the column `isSharedSubfolder` on the `Folder` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Folder" DROP COLUMN "isAccessLimited",
DROP COLUMN "isSharedSubfolder";
