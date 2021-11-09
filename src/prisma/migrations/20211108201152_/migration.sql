-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `Propietario_ID` INTEGER NULL,
    `Tramitador_ID` INTEGER NULL,

    UNIQUE INDEX `Usuario_email_key`(`email`),
    UNIQUE INDEX `Usuario_Propietario_ID_key`(`Propietario_ID`),
    UNIQUE INDEX `Usuario_Tramitador_ID_key`(`Tramitador_ID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tramitador` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombres` VARCHAR(191) NOT NULL,
    `apellidos` VARCHAR(191) NOT NULL,
    `tipo_doc` VARCHAR(191) NOT NULL,
    `numero_doc` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Tramitador_numero_doc_key`(`numero_doc`),
    UNIQUE INDEX `Tramitador_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Propietario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombres` VARCHAR(191) NOT NULL,
    `apellidos` VARCHAR(191) NOT NULL,
    `tipo_doc` VARCHAR(191) NOT NULL,
    `numero_doc` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NOT NULL,
    `tipo_persona` VARCHAR(191) NOT NULL DEFAULT 'Natural',

    UNIQUE INDEX `Propietario_numero_doc_key`(`numero_doc`),
    UNIQUE INDEX `Propietario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Predio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigoCatastral` VARCHAR(191) NOT NULL,
    `matricula` VARCHAR(191) NULL,
    `via` VARCHAR(191) NOT NULL,
    `nro` VARCHAR(191) NOT NULL,
    `apen` VARCHAR(191) NOT NULL DEFAULT '',
    `cruce` VARCHAR(191) NOT NULL,
    `nro2` VARCHAR(191) NOT NULL,
    `apen2` VARCHAR(191) NOT NULL DEFAULT '',
    `placa` VARCHAR(191) NULL,
    `apartamento` VARCHAR(191) NULL,
    `urb_edif` VARCHAR(191) NOT NULL DEFAULT '',
    `estrato` VARCHAR(191) NOT NULL,
    `barrio` VARCHAR(191) NOT NULL,
    `comuna` VARCHAR(191) NOT NULL,
    `clasificacionSuelo` VARCHAR(191) NOT NULL,
    `uso` VARCHAR(191) NOT NULL,
    `poligono` VARCHAR(191) NOT NULL,
    `zonaAvaluo` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Predio_codigoCatastral_key`(`codigoCatastral`),
    UNIQUE INDEX `Predio_matricula_key`(`matricula`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TipoSolicitud` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `licencia` VARCHAR(191) NOT NULL,
    `tipo_licencia` VARCHAR(191) NOT NULL,
    `objetivo_tramite` VARCHAR(191) NOT NULL,
    `area_construida` VARCHAR(191) NOT NULL,
    `modalidad` VARCHAR(191) NOT NULL,
    `sistema_estructural` VARCHAR(191) NOT NULL,
    `detalles_solicitud` VARCHAR(191) NOT NULL,
    `ponderador` VARCHAR(191) NOT NULL,
    `Radicado_ID` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Radicado` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nro_radicado` VARCHAR(191) NOT NULL,
    `cargo_fijo` INTEGER NOT NULL,
    `cargo_varible` INTEGER NULL,
    `req_minimos` BOOLEAN NOT NULL DEFAULT false,
    `crated_at` DATETIME(3) NOT NULL,
    `Estado_ID` INTEGER NOT NULL,
    `Predio_ID` INTEGER NOT NULL,
    `usuario_ID` INTEGER NULL,
    `Tramitador_ID` INTEGER NULL,

    UNIQUE INDEX `Radicado_nro_radicado_key`(`nro_radicado`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DocumentosTramite` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EstadoRadicado` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_RoleToUsuario` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_RoleToUsuario_AB_unique`(`A`, `B`),
    INDEX `_RoleToUsuario_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_PredioToPropietario` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PredioToPropietario_AB_unique`(`A`, `B`),
    INDEX `_PredioToPropietario_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_DocumentosTramiteToRadicado` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_DocumentosTramiteToRadicado_AB_unique`(`A`, `B`),
    INDEX `_DocumentosTramiteToRadicado_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_Propietario_ID_fkey` FOREIGN KEY (`Propietario_ID`) REFERENCES `Propietario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_Tramitador_ID_fkey` FOREIGN KEY (`Tramitador_ID`) REFERENCES `Tramitador`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TipoSolicitud` ADD CONSTRAINT `TipoSolicitud_Radicado_ID_fkey` FOREIGN KEY (`Radicado_ID`) REFERENCES `Radicado`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Radicado` ADD CONSTRAINT `Radicado_Estado_ID_fkey` FOREIGN KEY (`Estado_ID`) REFERENCES `EstadoRadicado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Radicado` ADD CONSTRAINT `Radicado_Predio_ID_fkey` FOREIGN KEY (`Predio_ID`) REFERENCES `Predio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Radicado` ADD CONSTRAINT `Radicado_usuario_ID_fkey` FOREIGN KEY (`usuario_ID`) REFERENCES `Usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Radicado` ADD CONSTRAINT `Radicado_Tramitador_ID_fkey` FOREIGN KEY (`Tramitador_ID`) REFERENCES `Tramitador`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RoleToUsuario` ADD FOREIGN KEY (`A`) REFERENCES `Role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RoleToUsuario` ADD FOREIGN KEY (`B`) REFERENCES `Usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PredioToPropietario` ADD FOREIGN KEY (`A`) REFERENCES `Predio`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PredioToPropietario` ADD FOREIGN KEY (`B`) REFERENCES `Propietario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DocumentosTramiteToRadicado` ADD FOREIGN KEY (`A`) REFERENCES `DocumentosTramite`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DocumentosTramiteToRadicado` ADD FOREIGN KEY (`B`) REFERENCES `Radicado`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
