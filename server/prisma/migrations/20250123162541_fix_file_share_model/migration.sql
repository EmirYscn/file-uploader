/*
  Warnings:

  - You are about to drop the column `folderId` on the `FileShare` table. All the data in the column will be lost.
  - Added the required column `fileId` to the `FileShare` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FileShare" DROP CONSTRAINT "FileShare_folderId_fkey";

-- AlterTable
ALTER TABLE "FileShare" DROP COLUMN "folderId",
ADD COLUMN     "fileId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "FileShare" ADD CONSTRAINT "FileShare_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;
