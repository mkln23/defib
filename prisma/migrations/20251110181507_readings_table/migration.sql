-- CreateTable
CREATE TABLE "readings" (
    "id" SERIAL NOT NULL,
    "deviceId" TEXT NOT NULL,
    "heart_beat" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "readings_pkey" PRIMARY KEY ("id")
);
