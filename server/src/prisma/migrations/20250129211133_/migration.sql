/*
  Warnings:

  - You are about to drop the column `billingAddress` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `shippingAddress` on the `order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `order` DROP COLUMN `billingAddress`,
    DROP COLUMN `shippingAddress`;
