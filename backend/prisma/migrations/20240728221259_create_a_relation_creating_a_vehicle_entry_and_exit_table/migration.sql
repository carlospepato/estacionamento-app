-- CreateTable
CREATE TABLE "vehicle_entry_and_exit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "vehicleId" TEXT NOT NULL,
    "parkingId" TEXT NOT NULL,
    "entry" DATETIME NOT NULL,
    "exit" DATETIME NOT NULL,
    "value" REAL NOT NULL,
    CONSTRAINT "vehicle_entry_and_exit_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "vehicle_entry_and_exit_parkingId_fkey" FOREIGN KEY ("parkingId") REFERENCES "parking" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
