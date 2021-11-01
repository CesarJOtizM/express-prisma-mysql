/*
  Warnings:

  - You are about to drop the column `Propietario_ID` on the `Radicado` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Radicado` DROP FOREIGN KEY `Radicado_Propietario_ID_fkey`;

-- AlterTable
ALTER TABLE `Radicado` DROP COLUMN `Propietario_ID`;
