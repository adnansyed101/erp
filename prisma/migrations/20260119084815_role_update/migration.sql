/*
  Warnings:

  - The values [CEO,ENGINEERING_MANAGER,DEVELOPER,DESIGNER] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `department` on the `PersonalInformation` table. All the data in the column will be lost.
  - Added the required column `score` to the `PersonalInformation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('ADMIN', 'BOARD_OWNER', 'CEO_MANAGING_DIRECTOR', 'CTO', 'COO', 'DEPARTMENT_HEAD', 'ENGINEERING_HEAD', 'DESIGN_HEAD', 'PROJECT_MANAGEMENT_HEAD', 'PRODUCT_HEAD', 'HR_HEAD', 'FINANCE_HEAD', 'SALES_MARKETING_HEAD', 'SUPPORT_OPERATIONS_HEAD', 'TECH_LEAD', 'QA_LEAD', 'DEVOPS_ENGINEER', 'PRODUCT_MANAGER', 'PROJECT_MANAGER', 'SENIOR_DEVELOPER', 'SCRUM_MASTER', 'HR_MANAGER', 'SALES_MANAGER', 'MID_LEVEL_DEVELOPER', 'UI_UX_DESIGNER', 'ACCOUNTANT', 'BUSINESS_DEVELOPMENT_EXECUTIVE', 'QA_ENGINEER', 'PAYROLL_OFFICER', 'JUNIOR_DEVELOPER', 'GRAPHIC_DESIGNER', 'HR_EXECUTIVE', 'MARKETING_EXECUTIVE', 'OFFICE_ADMIN', 'IT_SUPPORT', 'INTERN', 'CLIENT');
ALTER TABLE "PersonalInformation" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "public"."Role_old";
COMMIT;

-- AlterTable
ALTER TABLE "PersonalInformation" DROP COLUMN "department",
ADD COLUMN     "score" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "Department";
