-- CreateTable
CREATE TABLE `refillBalanceRequestStatus` (
    `id` VARCHAR(191) NOT NULL,
    `requestId` VARCHAR(191) NOT NULL,
    `status` ENUM('pending', 'rejected', 'approved') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `refillBalanceRequestStatus` ADD CONSTRAINT `refillBalanceRequestStatus_requestId_fkey` FOREIGN KEY (`requestId`) REFERENCES `refillBalanceRequest`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
