/*
  Warnings:

  - You are about to drop the `InspecaoVeiculo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "InspecaoVeiculo";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Inspecao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "placa" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "crlvEmDia" BOOLEAN NOT NULL,
    "fotoCRLV" TEXT NOT NULL,
    "certificadoTacografoEmDia" BOOLEAN NOT NULL,
    "fotoTacografo" TEXT NOT NULL,
    "nivelAgua" TEXT NOT NULL,
    "fotoNivelAgua" TEXT NOT NULL,
    "nivelOleo" TEXT NOT NULL,
    "situacaoPneus" TEXT NOT NULL,
    "fotosPneusBom" TEXT NOT NULL,
    "motivoPneuRuim" TEXT NOT NULL,
    "fotosPneusRuim" TEXT NOT NULL,
    "pneuFurado" TEXT NOT NULL,
    "fotoPneuFurado" TEXT NOT NULL,
    "avariasCabine" BOOLEAN NOT NULL,
    "descricaoAvariasCabine" TEXT NOT NULL,
    "fotosAvariasCabine" TEXT NOT NULL,
    "bauPossuiAvarias" BOOLEAN NOT NULL,
    "descricaoAvariasBau" TEXT NOT NULL,
    "fotosAvariasBau" TEXT NOT NULL,
    "funcionamentoParteEletrica" BOOLEAN NOT NULL,
    "motivoParteEletricaRuim" TEXT NOT NULL,
    "fotosParteEletricaRuim" TEXT NOT NULL,
    "sugestao" TEXT NOT NULL,
    CONSTRAINT "Inspecao_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
