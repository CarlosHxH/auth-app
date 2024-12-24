/*
  Warnings:

  - You are about to drop the `Inspecao` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Vehicle` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Inspecao";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Vehicle";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Vehicles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "licensePlate" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Vehicles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Inspections" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dataInspecao" DATETIME NOT NULL,
    "crlvEmDia" BOOLEAN NOT NULL,
    "fotoCRLV" TEXT,
    "certificadoTacografoEmDia" BOOLEAN NOT NULL,
    "fotoTacografo" TEXT,
    "nivelAgua" TEXT,
    "fotoNivelAgua" TEXT,
    "nivelOleo" TEXT,
    "fotoNivelOleo" TEXT,
    "situacaoPneus" TEXT,
    "fotosPneusBom" TEXT,
    "motivoPneuRuim" TEXT,
    "fotosPneusRuim" TEXT,
    "pneuFurado" BOOLEAN NOT NULL,
    "fotoPneuFurado" TEXT,
    "avariasCabine" BOOLEAN NOT NULL,
    "descricaoAvariasCabine" TEXT,
    "fotosAvariasCabine" TEXT,
    "bauPossuiAvarias" BOOLEAN NOT NULL,
    "descricaoAvariasBau" TEXT,
    "fotosAvariasBau" TEXT,
    "funcionamentoParteEletrica" BOOLEAN NOT NULL,
    "motivoParteEletricaRuim" TEXT,
    "fotosParteEletricaRuim" TEXT,
    "sugestao" TEXT,
    "userId" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    CONSTRAINT "Inspections_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Inspections_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Vehicles_licensePlate_key" ON "Vehicles"("licensePlate");
