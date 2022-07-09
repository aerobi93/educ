-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_childId_fkey";

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
