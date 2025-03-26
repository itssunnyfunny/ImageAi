/*
  Warnings:

  - The values [South_EastAsian] on the enum `EthenecityEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EthenecityEnum_new" AS ENUM ('White', 'Black', 'Asian_American', 'East_Asian', 'South_East_Asian', 'South_Asian', 'Middle_Eastern', 'Pacific', 'Hispanic');
ALTER TABLE "Model" ALTER COLUMN "Ethenecity" TYPE "EthenecityEnum_new" USING ("Ethenecity"::text::"EthenecityEnum_new");
ALTER TYPE "EthenecityEnum" RENAME TO "EthenecityEnum_old";
ALTER TYPE "EthenecityEnum_new" RENAME TO "EthenecityEnum";
DROP TYPE "EthenecityEnum_old";
COMMIT;
