-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_vehicle_entry_and_exit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "vehicleId" TEXT NOT NULL,
    "parkingId" TEXT NOT NULL,
    "entry" DATETIME NOT NULL,
    "exit" DATETIME,
    "value" REAL,
    CONSTRAINT "vehicle_entry_and_exit_parkingId_fkey" FOREIGN KEY ("parkingId") REFERENCES "parking" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "vehicle_entry_and_exit_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_vehicle_entry_and_exit" ("entry", "exit", "id", "parkingId", "value", "vehicleId") SELECT "entry", "exit", "id", "parkingId", "value", "vehicleId" FROM "vehicle_entry_and_exit";
DROP TABLE "vehicle_entry_and_exit";
ALTER TABLE "new_vehicle_entry_and_exit" RENAME TO "vehicle_entry_and_exit";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
