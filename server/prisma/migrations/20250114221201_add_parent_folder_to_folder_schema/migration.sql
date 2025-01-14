/*
  Warnings:

  - You are about to drop the column `folder_id` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Folder` table. All the data in the column will be lost.
  - Added the required column `userId` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parentId` to the `Folder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Folder` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_folder_id_fkey";

-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Folder" DROP CONSTRAINT "Folder_user_id_fkey";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "folder_id",
DROP COLUMN "user_id",
ADD COLUMN     "folderId" INTEGER,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Folder" DROP COLUMN "user_id",
ADD COLUMN     "parentId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Folder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
