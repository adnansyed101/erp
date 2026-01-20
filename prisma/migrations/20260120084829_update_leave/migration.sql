/*
  Warnings:

  - Added the required column `totalDays` to the `LeaveManagement` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `leaveType` on the `LeaveManagement` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "LeaveType" AS ENUM ('casual', 'sick', 'earned');

-- AlterTable
ALTER TABLE "LeaveManagement" ADD COLUMN     "totalDays" TEXT NOT NULL,
DROP COLUMN "leaveType",
ADD COLUMN     "leaveType" "LeaveType" NOT NULL;
