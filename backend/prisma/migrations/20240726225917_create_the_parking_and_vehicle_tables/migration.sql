-- CreateTable
CREATE TABLE "parking" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "maxCars" INTEGER NOT NULL,
    "maxMotorcycles" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "vehicle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "plate" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "parkingId" TEXT NOT NULL,
    CONSTRAINT "vehicle_parkingId_fkey" FOREIGN KEY ("parkingId") REFERENCES "parking" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
