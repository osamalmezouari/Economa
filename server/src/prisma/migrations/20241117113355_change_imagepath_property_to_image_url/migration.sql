/*
  Warnings:

  - You are about to drop the column `imagePath` on the `gallery` table. All the data in the column will be lost.
  - Added the required column `imageUrl` to the `Gallery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `gallery` DROP COLUMN `imagePath`,
    ADD COLUMN `imageUrl` VARCHAR(191) NOT NULL;
