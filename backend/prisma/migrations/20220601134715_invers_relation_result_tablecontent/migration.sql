/*
  Warnings:

  - You are about to drop the column `resultID` on the `TableContents` table. All the data in the column will be lost.
  - Added the required column `contentID` to the `Results` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TableContents" DROP CONSTRAINT "TableContents_resultID_fkey";

-- AlterTable
ALTER TABLE "Results" ADD COLUMN     "contentID" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TableContents" DROP COLUMN "resultID";

-- AddForeignKey
ALTER TABLE "Results" ADD CONSTRAINT "Results_contentID_fkey" FOREIGN KEY ("contentID") REFERENCES "TableContents"("id") ON DELETE CASCADE ON UPDATE CASCADE;
