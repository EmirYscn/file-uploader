-- CreateEnum
CREATE TYPE "accessType" AS ENUM ('LIMITED', 'FULL');

-- AlterTable
ALTER TABLE "FileShare" ADD COLUMN     "accessType" "accessType",
ADD COLUMN     "expireDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "FolderShare" ADD COLUMN     "accessType" "accessType",
ADD COLUMN     "expireDate" TIMESTAMP(3);
