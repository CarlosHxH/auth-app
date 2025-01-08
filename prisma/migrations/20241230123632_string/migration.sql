-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Vehicle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "eixo" TEXT NOT NULL,
    "plate" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_Vehicle" ("createdAt", "eixo", "id", "plate", "make", "model", "updatedAt", "year") SELECT "createdAt", "eixo", "id", "plate", "make", "model", "updatedAt", "year" FROM "Vehicle";
DROP TABLE "Vehicle";
ALTER TABLE "new_Vehicle" RENAME TO "Vehicle";
CREATE UNIQUE INDEX "Vehicle_plate_key" ON "Vehicle"("plate");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
