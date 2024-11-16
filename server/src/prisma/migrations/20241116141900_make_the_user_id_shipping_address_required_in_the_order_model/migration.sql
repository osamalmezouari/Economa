/*
  Warnings:

  - Made the column `userId` on table `order` required. This step will fail if there are existing NULL values in that column.
  - Made the column `shippingAddress` on table `order` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_userId_fkey`;

-- AlterTable
ALTER TABLE `order` MODIFY `userId` VARCHAR(191) NOT NULL,
    MODIFY `shippingAddress` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
