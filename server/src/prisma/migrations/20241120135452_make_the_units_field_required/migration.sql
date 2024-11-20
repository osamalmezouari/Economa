/*
  Warnings:

  - Made the column `unitId` on table `product` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_unitId_fkey`;

-- AlterTable
ALTER TABLE `product` MODIFY `unitId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_unitId_fkey` FOREIGN KEY (`unitId`) REFERENCES `Units`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
