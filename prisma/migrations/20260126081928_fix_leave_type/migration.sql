/*
  Warnings:

  - Changed the type of `totalDays` on the `LeaveManagement` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "LeaveManagement" DROP COLUMN "totalDays",
ADD COLUMN     "totalDays" INTEGER NOT NULL;
