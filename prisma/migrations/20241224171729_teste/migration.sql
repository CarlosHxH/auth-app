-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "emailVerified" DATETIME,
    "password" TEXT,
    "name" TEXT,
    "image" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" TEXT
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" DATETIME NOT NULL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "licensePlate" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Vehicle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Inspection" (
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
    CONSTRAINT "Inspection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Inspection_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_licensePlate_key" ON "Vehicle"("licensePlate");
