-- CreateEnum
CREATE TYPE "LeaveStatus" AS ENUM ('pending', 'accepted', 'rejected');

-- CreateTable
CREATE TABLE "LeaveManagement" (
    "id" TEXT NOT NULL,
    "leaveType" TEXT NOT NULL,
    "leaveFrom" TIMESTAMP(3) NOT NULL,
    "leaveTO" TIMESTAMP(3) NOT NULL,
    "purposeOfLeave" TEXT NOT NULL,
    "addressDuringLeave" TEXT NOT NULL,
    "emergencyContactNumber" TEXT NOT NULL,
    "approved" "LeaveStatus" NOT NULL DEFAULT 'pending',
    "approverId" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,

    CONSTRAINT "LeaveManagement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LeaveManagement_approverId_key" ON "LeaveManagement"("approverId");

-- AddForeignKey
ALTER TABLE "LeaveManagement" ADD CONSTRAINT "LeaveManagement_approverId_fkey" FOREIGN KEY ("approverId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaveManagement" ADD CONSTRAINT "LeaveManagement_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
