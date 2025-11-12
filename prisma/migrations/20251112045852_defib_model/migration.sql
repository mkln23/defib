/*
  Warnings:

  - You are about to drop the column `device_id` on the `readings` table. All the data in the column will be lost.
  - You are about to drop the column `heart_beat` on the `readings` table. All the data in the column will be lost.
  - You are about to drop the column `connectionId` on the `web_socket_connections` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `web_socket_connections` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[connection_id]` on the table `web_socket_connections` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `defib_id` to the `readings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `heart_rate_bpm` to the `readings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hf_power` to the `readings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lf_hf_ratio` to the `readings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lf_power` to the `readings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qrs_width_ms` to the `readings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rmssd_ms` to the `readings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sdnn_ms` to the `readings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `signal_energy` to the `readings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `signal_entropy` to the `readings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `connection_id` to the `web_socket_connections` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "web_socket_connections_connectionId_key";

-- AlterTable
ALTER TABLE "readings" DROP COLUMN "device_id",
DROP COLUMN "heart_beat",
ADD COLUMN     "defib_id" TEXT NOT NULL,
ADD COLUMN     "defibrillatorId" INTEGER,
ADD COLUMN     "heart_rate_bpm" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "hf_power" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "lf_hf_ratio" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "lf_power" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "qrs_width_ms" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "rmssd_ms" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "sdnn_ms" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "signal_energy" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "signal_entropy" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "web_socket_connections" DROP COLUMN "connectionId",
DROP COLUMN "createdAt",
ADD COLUMN     "connection_id" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "defibrillators" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "defibrillators_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "web_socket_connections_connection_id_key" ON "web_socket_connections"("connection_id");

-- AddForeignKey
ALTER TABLE "readings" ADD CONSTRAINT "readings_defibrillatorId_fkey" FOREIGN KEY ("defibrillatorId") REFERENCES "defibrillators"("id") ON DELETE SET NULL ON UPDATE CASCADE;
