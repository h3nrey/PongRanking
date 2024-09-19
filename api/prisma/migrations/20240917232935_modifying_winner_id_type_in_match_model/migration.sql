/*
  Warnings:

  - Changed the type of `winnerId` on the `Match` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Match" DROP COLUMN "winnerId",
ADD COLUMN     "winnerId" INTEGER NOT NULL;
