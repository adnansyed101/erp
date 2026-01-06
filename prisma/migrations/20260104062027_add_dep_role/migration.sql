/*
  Warnings:

  - Added the required column `department` to the `PersonalInformation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `PersonalInformation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CEO', 'CTO', 'ENGINEERING_MANAGER', 'TECH_LEAD', 'DEVELOPER', 'DESIGNER', 'PM');

-- CreateEnum
CREATE TYPE "Department" AS ENUM ('EXECUTIVE', 'ENGINEERING', 'PRODUCT', 'DESIGN', 'SALES');

-- AlterTable
ALTER TABLE "PersonalInformation" ADD COLUMN     "department" "Department" NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL;

-- AlterTable
ALTER TABLE "session" ADD COLUMN     "impersonatedBy" TEXT;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "banExpires" TIMESTAMP(3),
ADD COLUMN     "banReason" TEXT,
ADD COLUMN     "banned" BOOLEAN DEFAULT false,
ADD COLUMN     "role" TEXT;
