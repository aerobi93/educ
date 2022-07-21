/*
  Warnings:

  - You are about to drop the column `contentID` on the `Results` table. All the data in the column will be lost.
  - Added the required column `contentName` to the `Results` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Results" DROP CONSTRAINT "Results_contentID_fkey";

-- AlterTable
ALTER TABLE "Results" DROP COLUMN "contentID",
ADD COLUMN     "contentName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Results" ADD CONSTRAINT "Results_contentName_fkey" FOREIGN KEY ("contentName") REFERENCES "TableContents"("id") ON DELETE CASCADE ON UPDATE CASCADE;
