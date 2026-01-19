/*
  Warnings:

  - A unique constraint covering the columns `[remainingLeaveId]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `remainingLeaveId` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "remainingLeaveId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Leave" (
    "id" TEXT NOT NULL,
    "casual" INTEGER NOT NULL DEFAULT 14,
    "sick" INTEGER NOT NULL DEFAULT 10,
    "earned" INTEGER NOT NULL DEFAULT 10,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Leave_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_remainingLeaveId_key" ON "Employee"("remainingLeaveId");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_remainingLeaveId_fkey" FOREIGN KEY ("remainingLeaveId") REFERENCES "Leave"("id") ON DELETE CASCADE ON UPDATE CASCADE;
