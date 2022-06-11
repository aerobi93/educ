/*
  Warnings:

  - Added the required column `userID` to the `Results` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Results" ADD COLUMN     "userID" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Results" ADD CONSTRAINT "Results_userID_fkey" FOREIGN KEY ("userID") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
