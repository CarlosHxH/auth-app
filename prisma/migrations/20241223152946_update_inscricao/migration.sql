/*
  Warnings:

  - The primary key for the `Inspecao` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Inspecao` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - Added the required column `dataInspecao` to the `Inspecao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fotoNivelOleo` to the `Inspecao` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Inspecao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "placa" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "dataInspecao" DATETIME NOT NULL,
    "crlvEmDia" BOOLEAN NOT NULL,
    "fotoCRLV" TEXT NOT NULL,
    "certificadoTacografoEmDia" BOOLEAN NOT NULL,
    "fotoTacografo" TEXT NOT NULL,
    "nivelAgua" TEXT NOT NULL,
    "fotoNivelAgua" TEXT NOT NULL,
    "nivelOleo" TEXT NOT NULL,
    "fotoNivelOleo" TEXT NOT NULL,
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
INSERT INTO "new_Inspecao" ("avariasCabine", "bauPossuiAvarias", "certificadoTacografoEmDia", "crlvEmDia", "descricaoAvariasBau", "descricaoAvariasCabine", "fotoCRLV", "fotoNivelAgua", "fotoPneuFurado", "fotoTacografo", "fotosAvariasBau", "fotosAvariasCabine", "fotosParteEletricaRuim", "fotosPneusBom", "fotosPneusRuim", "funcionamentoParteEletrica", "id", "modelo", "motivoParteEletricaRuim", "motivoPneuRuim", "nivelAgua", "nivelOleo", "placa", "pneuFurado", "situacaoPneus", "sugestao", "userId") SELECT "avariasCabine", "bauPossuiAvarias", "certificadoTacografoEmDia", "crlvEmDia", "descricaoAvariasBau", "descricaoAvariasCabine", "fotoCRLV", "fotoNivelAgua", "fotoPneuFurado", "fotoTacografo", "fotosAvariasBau", "fotosAvariasCabine", "fotosParteEletricaRuim", "fotosPneusBom", "fotosPneusRuim", "funcionamentoParteEletrica", "id", "modelo", "motivoParteEletricaRuim", "motivoPneuRuim", "nivelAgua", "nivelOleo", "placa", "pneuFurado", "situacaoPneus", "sugestao", "userId" FROM "Inspecao";
DROP TABLE "Inspecao";
ALTER TABLE "new_Inspecao" RENAME TO "Inspecao";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
