/*
  Warnings:

  - Changed the type of `dni` on the `Client` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `cuil` on the `Client` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Client" DROP COLUMN "dni",
ADD COLUMN     "dni" INTEGER NOT NULL,
DROP COLUMN "cuil",
ADD COLUMN     "cuil" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Client_dni_key" ON "Client"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "Client_cuil_key" ON "Client"("cuil");
