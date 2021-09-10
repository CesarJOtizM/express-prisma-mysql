-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `propietario_ID` INTEGER,
    `tramitador_ID` INTEGER,

    UNIQUE INDEX `Usuario_email_key`(`email`),
    UNIQUE INDEX `Usuario_propietario_ID_unique`(`propietario_ID`),
    UNIQUE INDEX `Usuario_tramitador_ID_unique`(`tramitador_ID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` ENUM('Tramitador', 'Admin', 'Propietario') NOT NULL DEFAULT 'Propietario',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tramitador` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombres` VARCHAR(191) NOT NULL,
    `apellidos` VARCHAR(191) NOT NULL,
    `tipo_doc` VARCHAR(191) NOT NULL,
    `numero_doc` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `ciudad` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Tramitador_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Propietario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombres` VARCHAR(191) NOT NULL,
    `apellidos` VARCHAR(191) NOT NULL,
    `tipo_doc` VARCHAR(191) NOT NULL,
    `numero_doc` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `ciudad` VARCHAR(191) NOT NULL,
    `es_Juridica` BOOLEAN NOT NULL,

    UNIQUE INDEX `Propietario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Predio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigoCatrastal` VARCHAR(191) NOT NULL,
    `matricula` VARCHAR(191),
    `via` VARCHAR(191) NOT NULL,
    `nro` VARCHAR(191) NOT NULL,
    `apen` VARCHAR(191) NOT NULL,
    `cruce` VARCHAR(191) NOT NULL,
    `placa` VARCHAR(191),
    `apartamento` VARCHAR(191),
    `urb_edif` VARCHAR(191) NOT NULL,
    `estrato` VARCHAR(191) NOT NULL,
    `barrio` VARCHAR(191) NOT NULL,
    `comuna` VARCHAR(191) NOT NULL,
    `clasificacionSuelo` VARCHAR(191) NOT NULL,
    `uso` VARCHAR(191) NOT NULL,
    `poligono` VARCHAR(191) NOT NULL,
    `zonaAvaluo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Propietarios_Predio` (
    `prpietarios_ID` INTEGER NOT NULL,
    `predio_ID` INTEGER NOT NULL,

    PRIMARY KEY (`prpietarios_ID`, `predio_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario_Rol` (
    `usuarios_ID` INTEGER NOT NULL,
    `rol_ID` INTEGER NOT NULL,

    PRIMARY KEY (`usuarios_ID`, `rol_ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_propietario_ID_fkey` FOREIGN KEY (`propietario_ID`) REFERENCES `Propietario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_tramitador_ID_fkey` FOREIGN KEY (`tramitador_ID`) REFERENCES `Tramitador`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Propietarios_Predio` ADD CONSTRAINT `Propietarios_Predio_prpietarios_ID_fkey` FOREIGN KEY (`prpietarios_ID`) REFERENCES `Propietario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Propietarios_Predio` ADD CONSTRAINT `Propietarios_Predio_predio_ID_fkey` FOREIGN KEY (`predio_ID`) REFERENCES `Predio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Usuario_Rol` ADD CONSTRAINT `Usuario_Rol_usuarios_ID_fkey` FOREIGN KEY (`usuarios_ID`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Usuario_Rol` ADD CONSTRAINT `Usuario_Rol_rol_ID_fkey` FOREIGN KEY (`rol_ID`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
