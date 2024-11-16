/*
  Warnings:

  - You are about to alter the column `discount_type` on the `coupon` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - You are about to alter the column `status` on the `order` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.
  - Added the required column `svgLink` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `category` ADD COLUMN `svgLink` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `coupon` MODIFY `discount_type` ENUM('Percentage', 'Flat') NOT NULL;

-- AlterTable
ALTER TABLE `order` MODIFY `status` ENUM('Pending', 'Completed', 'Shipped', 'Cancelled') NOT NULL;
