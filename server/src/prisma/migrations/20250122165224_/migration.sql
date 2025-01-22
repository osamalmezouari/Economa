/*
  Warnings:

  - You are about to drop the column `amount` on the `balance` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `balance` DROP COLUMN `amount`,
    ADD COLUMN `Balance` DOUBLE NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `refillBalanceRequest` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'pending',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `refillBalanceRequest` ADD CONSTRAINT `refillBalanceRequest_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
