-- AlterEnum
ALTER TYPE "Roles" ADD VALUE 'child';

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "name" TEXT,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "validate" DROP NOT NULL,
ALTER COLUMN "validate" DROP DEFAULT,
ALTER COLUMN "validate" SET DATA TYPE TEXT;
