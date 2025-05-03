/*
  Warnings:

  - You are about to alter the column `rolelvl` on the `role` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `role` MODIFY `rolelvl` INTEGER NULL;
