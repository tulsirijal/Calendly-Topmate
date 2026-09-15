-- CreateTable
CREATE TABLE "availabilities" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "timezone" TEXT NOT NULL DEFAULT 'UTC',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "availabilities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "availabilities_userId_dayOfWeek_idx" ON "availabilities"("userId", "dayOfWeek");

-- AddForeignKey
ALTER TABLE "availabilities" ADD CONSTRAINT "availabilities_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
