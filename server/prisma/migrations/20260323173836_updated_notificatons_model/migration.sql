/*
  Warnings:

  - Added the required column `type` to the `Notifacation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notifacation" ADD COLUMN     "groupId" TEXT,
ADD COLUMN     "type" TEXT NOT NULL;
