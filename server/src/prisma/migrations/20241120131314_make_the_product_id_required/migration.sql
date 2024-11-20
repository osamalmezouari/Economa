/*
  Warnings:

  - Made the column `productId` on table `gallery` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `gallery` DROP FOREIGN KEY `Gallery_productId_fkey`;

-- AlterTable
ALTER TABLE `gallery` MODIFY `productId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Gallery` ADD CONSTRAINT `Gallery_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
