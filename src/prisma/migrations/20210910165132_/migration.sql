/*
  Warnings:

  - You are about to drop the `Propietarios_Predio` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[codigoCatrastal]` on the table `Predio` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[matricula]` on the table `Predio` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[numero_doc]` on the table `Propietario` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Propietarios_Predio` DROP FOREIGN KEY `Propietarios_Predio_predio_ID_fkey`;

-- DropForeignKey
ALTER TABLE `Propietarios_Predio` DROP FOREIGN KEY `Propietarios_Predio_prpietarios_ID_fkey`;

-- AlterTable
ALTER TABLE `Propietario` MODIFY `numero_doc` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Propietarios_Predio`;

-- CreateTable
CREATE TABLE `_PredioToPropietario` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PredioToPropietario_AB_unique`(`A`, `B`),
    INDEX `_PredioToPropietario_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Predio_codigoCatrastal_key` ON `Predio`(`codigoCatrastal`);

-- CreateIndex
CREATE UNIQUE INDEX `Predio_matricula_key` ON `Predio`(`matricula`);

-- CreateIndex
CREATE UNIQUE INDEX `Propietario_numero_doc_key` ON `Propietario`(`numero_doc`);

-- AddForeignKey
ALTER TABLE `_PredioToPropietario` ADD FOREIGN KEY (`A`) REFERENCES `Predio`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PredioToPropietario` ADD FOREIGN KEY (`B`) REFERENCES `Propietario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
