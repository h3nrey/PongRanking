/*
  Warnings:

  - The primary key for the `Player` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Player` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `playerId` on the `Rating` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `B` on the `_MatchToPlayer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_playerId_fkey";

-- DropForeignKey
ALTER TABLE "_MatchToPlayer" DROP CONSTRAINT "_MatchToPlayer_B_fkey";

-- AlterTable
ALTER TABLE "Player" DROP CONSTRAINT "Player_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Player_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Rating" DROP COLUMN "playerId",
ADD COLUMN     "playerId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "_MatchToPlayer" DROP COLUMN "B",
ADD COLUMN     "B" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "_MatchToPlayer_AB_unique" ON "_MatchToPlayer"("A", "B");

-- CreateIndex
CREATE INDEX "_MatchToPlayer_B_index" ON "_MatchToPlayer"("B");

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MatchToPlayer" ADD CONSTRAINT "_MatchToPlayer_B_fkey" FOREIGN KEY ("B") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;
