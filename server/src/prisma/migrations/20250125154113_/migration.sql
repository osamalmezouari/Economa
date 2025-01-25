/*
  Warnings:

  - You are about to drop the column `incomePercentage` on the `product` table. All the data in the column will be lost.
  - Added the required column `cost_price` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `incomePercentage`,
    ADD COLUMN `cost_price` DOUBLE NOT NULL;
