/*
  Warnings:

  - You are about to drop the column `playerId` on the `Match` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_playerId_fkey";

-- AlterTable
ALTER TABLE "Match" DROP COLUMN "playerId";

-- AlterTable
ALTER TABLE "PlayersMatches" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
