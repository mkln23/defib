/*
  Warnings:

  - You are about to drop the column `defibrillatorId` on the `readings` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "readings" DROP CONSTRAINT "readings_defibrillatorId_fkey";

-- AlterTable
ALTER TABLE "readings" DROP COLUMN "defibrillatorId",
ADD COLUMN     "defibrillator_id" INTEGER,
ALTER COLUMN "lf_hf_ratio" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "readings" ADD CONSTRAINT "readings_defibrillator_id_fkey" FOREIGN KEY ("defibrillator_id") REFERENCES "defibrillators"("id") ON DELETE SET NULL ON UPDATE CASCADE;
