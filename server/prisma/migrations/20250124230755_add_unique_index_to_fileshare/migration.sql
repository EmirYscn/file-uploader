/*
  Warnings:

  - A unique constraint covering the columns `[fileId,userId]` on the table `FileShare` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FileShare_fileId_userId_key" ON "FileShare"("fileId", "userId");
