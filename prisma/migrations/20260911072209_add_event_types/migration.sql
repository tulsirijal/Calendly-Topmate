-- CreateTable
CREATE TABLE "event_types" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "hostId" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "durationMinutes" INTEGER NOT NULL,
    "locationType" TEXT NOT NULL DEFAULT 'online',
    "locationValue" TEXT,
    "bufferTimeBeforeMinutes" INTEGER NOT NULL DEFAULT 0,
    "bufferTimeAfterMinutes" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "event_types_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "event_types" ADD CONSTRAINT "event_types_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
