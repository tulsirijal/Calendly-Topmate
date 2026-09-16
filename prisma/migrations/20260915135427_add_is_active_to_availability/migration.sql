-- DropForeignKey
ALTER TABLE "availabilities" DROP CONSTRAINT "availabilities_userId_fkey";

-- DropForeignKey
ALTER TABLE "availability_exceptions" DROP CONSTRAINT "availability_exceptions_userId_fkey";

-- DropForeignKey
ALTER TABLE "slots" DROP CONSTRAINT "slots_hostId_fkey";

-- AlterTable
ALTER TABLE "availabilities" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AddForeignKey
ALTER TABLE "availabilities" ADD CONSTRAINT "availabilities_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "availability_exceptions" ADD CONSTRAINT "availability_exceptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "slots" ADD CONSTRAINT "slots_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
