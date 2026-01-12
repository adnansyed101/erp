/*
  Warnings:

  - A unique constraint covering the columns `[personalInformationId]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_bankInformationId_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_personalInformationId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "Employee_personalInformationId_key" ON "Employee"("personalInformationId");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_personalInformationId_fkey" FOREIGN KEY ("personalInformationId") REFERENCES "PersonalInformation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_bankInformationId_fkey" FOREIGN KEY ("bankInformationId") REFERENCES "BankInformation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
