-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Inspecao" (
    "id" TEXT NOT NULL PRIMARY KEY,
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
    CONSTRAINT "Inspecao_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Inspecao" ("avariasCabine", "bauPossuiAvarias", "certificadoTacografoEmDia", "crlvEmDia", "dataInspecao", "descricaoAvariasBau", "descricaoAvariasCabine", "fotoCRLV", "fotoNivelAgua", "fotoNivelOleo", "fotoPneuFurado", "fotoTacografo", "fotosAvariasBau", "fotosAvariasCabine", "fotosParteEletricaRuim", "fotosPneusBom", "fotosPneusRuim", "funcionamentoParteEletrica", "id", "modelo", "motivoParteEletricaRuim", "motivoPneuRuim", "nivelAgua", "nivelOleo", "placa", "pneuFurado", "situacaoPneus", "sugestao", "userId") SELECT "avariasCabine", "bauPossuiAvarias", "certificadoTacografoEmDia", "crlvEmDia", "dataInspecao", "descricaoAvariasBau", "descricaoAvariasCabine", "fotoCRLV", "fotoNivelAgua", "fotoNivelOleo", "fotoPneuFurado", "fotoTacografo", "fotosAvariasBau", "fotosAvariasCabine", "fotosParteEletricaRuim", "fotosPneusBom", "fotosPneusRuim", "funcionamentoParteEletrica", "id", "modelo", "motivoParteEletricaRuim", "motivoPneuRuim", "nivelAgua", "nivelOleo", "placa", "pneuFurado", "situacaoPneus", "sugestao", "userId" FROM "Inspecao";
DROP TABLE "Inspecao";
ALTER TABLE "new_Inspecao" RENAME TO "Inspecao";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
