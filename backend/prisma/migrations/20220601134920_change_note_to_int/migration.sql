/*
  Warnings:

  - Changed the type of `note` on the `Results` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Results" DROP COLUMN "note",
ADD COLUMN     "note" INTEGER NOT NULL;
