/*
  Warnings:

  - You are about to alter the column `tipo` on the `Role` table. The data in that column could be lost. The data in that column will be cast from `Enum("Role_tipo")` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `Role` MODIFY `tipo` VARCHAR(191) NOT NULL;
