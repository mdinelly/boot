-- CreateTable
CREATE TABLE `atendimento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `language` VARCHAR(10) NOT NULL,
    `link` VARCHAR(255) NOT NULL,
    `model` VARCHAR(255) NOT NULL,
    `number` VARCHAR(255) NOT NULL,
    `picture_model` VARCHAR(255) NOT NULL,
    `imei` VARCHAR(255) NULL,
    `protocolo` VARCHAR(255) NOT NULL,
    `status` VARCHAR(255) NOT NULL DEFAULT 'aberto',
    `link_entregue_cliente` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `whatsapps` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `session` TEXT NULL,
    `qrcode` TEXT NULL,
    `status` VARCHAR(255) NULL,
    `battery` VARCHAR(255) NULL,
    `plugged` BOOLEAN NULL,
    `name` VARCHAR(255) NOT NULL,
    `isDefault` BOOLEAN NOT NULL DEFAULT false,
    `retries` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stageChatBots` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `stage` INTEGER NOT NULL DEFAULT 0,
    `number` VARCHAR(255) NOT NULL,
    `protocolo` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
