/*
  Warnings:

  - You are about to drop the `_PredioToPropietario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_PredioToPropietario` DROP FOREIGN KEY `_PredioToPropietario_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_PredioToPropietario` DROP FOREIGN KEY `_PredioToPropietario_ibfk_2`;

-- DropTable
DROP TABLE `_PredioToPropietario`;

-- CreateTable
CREATE TABLE `Propietarios_Predio` (
    `propietarios_ID` INTEGER NOT NULL,
    `predio_ID` INTEGER NOT NULL,

    PRIMARY KEY (`propietarios_ID`, `predio_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Propietarios_Predio` ADD CONSTRAINT `Propietarios_Predio_propietarios_ID_fkey` FOREIGN KEY (`propietarios_ID`) REFERENCES `Propietario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Propietarios_Predio` ADD CONSTRAINT `Propietarios_Predio_predio_ID_fkey` FOREIGN KEY (`predio_ID`) REFERENCES `Predio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
