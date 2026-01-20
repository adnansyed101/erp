/*
  Warnings:

  - You are about to drop the column `remainingLeaveId` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `casual` on the `Leave` table. All the data in the column will be lost.
  - You are about to drop the column `earned` on the `Leave` table. All the data in the column will be lost.
  - You are about to drop the column `sick` on the `Leave` table. All the data in the column will be lost.
  - You are about to drop the column `leaveTO` on the `LeaveManagement` table. All the data in the column will be lost.
  - Added the required column `leaveTo` to the `LeaveManagement` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_remainingLeaveId_fkey";

-- DropIndex
DROP INDEX "Employee_remainingLeaveId_key";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "remainingLeaveId";

-- AlterTable
ALTER TABLE "Leave" DROP COLUMN "casual",
DROP COLUMN "earned",
DROP COLUMN "sick",
ADD COLUMN     "balance" INTEGER NOT NULL DEFAULT 10,
ADD COLUMN     "employeeId" TEXT,
ADD COLUMN     "leaveTaken" INTEGER NOT NULL DEFAULT 10,
ADD COLUMN     "leaveType" "LeaveType" NOT NULL DEFAULT 'casual',
ADD COLUMN     "yearlyLeave" INTEGER NOT NULL DEFAULT 10;

-- AlterTable
ALTER TABLE "LeaveManagement" DROP COLUMN "leaveTO",
ADD COLUMN     "leaveTo" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Leave" ADD CONSTRAINT "Leave_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
