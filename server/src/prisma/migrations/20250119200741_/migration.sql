/*
  Warnings:

  - You are about to drop the column `paymentMethod` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `transactionId` on the `payment` table. All the data in the column will be lost.
  - Made the column `productId` on table `productreview` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rating` on table `productreview` required. This step will fail if there are existing NULL values in that column.
  - Made the column `roleId` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `productreview` DROP FOREIGN KEY `ProductReview_productId_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_roleId_fkey`;

-- DropIndex
DROP INDEX `Payment_transactionId_key` ON `payment`;

-- AlterTable
ALTER TABLE `payment` DROP COLUMN `paymentMethod`,
    DROP COLUMN `transactionId`,
    MODIFY `paymentStatus` VARCHAR(191) NOT NULL DEFAULT 'paid';

-- AlterTable
ALTER TABLE `product` ADD COLUMN `incomePercentage` DOUBLE NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `productreview` MODIFY `productId` VARCHAR(191) NOT NULL,
    MODIFY `rating` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `roleId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Balance` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Balance_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Balance` ADD CONSTRAINT `Balance_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductReview` ADD CONSTRAINT `ProductReview_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
