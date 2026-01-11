/*
  Warnings:

  - You are about to drop the column `impersonatedBy` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `banExpires` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `banReason` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `banned` on the `user` table. All the data in the column will be lost.
  - Made the column `role` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "session" DROP COLUMN "impersonatedBy";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "banExpires",
DROP COLUMN "banReason",
DROP COLUMN "banned",
ALTER COLUMN "role" SET NOT NULL,
ALTER COLUMN "role" SET DEFAULT 'employee';
