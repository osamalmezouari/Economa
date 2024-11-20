-- AlterTable
ALTER TABLE `product` ADD COLUMN `unitId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Units` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Units_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_unitId_fkey` FOREIGN KEY (`unitId`) REFERENCES `Units`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
