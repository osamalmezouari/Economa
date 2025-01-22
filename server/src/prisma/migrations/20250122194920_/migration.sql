/*
  Warnings:

  - Added the required column `file` to the `refillBalanceRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `refillbalancerequest` ADD COLUMN `file` VARCHAR(191) NOT NULL;
