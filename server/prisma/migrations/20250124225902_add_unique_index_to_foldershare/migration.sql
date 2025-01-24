/*
  Warnings:

  - A unique constraint covering the columns `[folderId,userId]` on the table `FolderShare` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FolderShare_folderId_userId_key" ON "FolderShare"("folderId", "userId");
